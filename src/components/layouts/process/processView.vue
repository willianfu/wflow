<script>
    import test from "@/assets/approvalTemplate"
    import arrow from "./arrow";

    export default {
        name: "processView",
        components: {arrow},
        props: {
            process: {
                type: Object
            }
        },
        data() {
            return {
                pro: test,
                updated: true,
                dom: {
                    type: 'root',
                    name: '发起人',
                    id: 1,
                    node: {
                        type: 'sp',
                        id: 2,
                        name: '审批人',
                        node: {
                            conditions: [
                                {
                                    condition: [
                                        {
                                            name: "条件1"
                                        }
                                    ],
                                    name: "条件1",
                                    node: {
                                        name: '审批人',
                                        id: 3,
                                        type: 'sp',
                                    }
                                }, {
                                    condition: [
                                        {
                                            name: "条件2"
                                        }
                                    ],
                                    name: "条件2",
                                    node: {
                                        name: '审批人',
                                        id: 4,
                                        type: 'sp',
                                    }
                                }
                            ],
                            type: 'condition',
                            node: {
                                name: '抄送人',
                                id: 5,
                                type: 'cs',
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            //console.log("模板数据：", this.dom)
        },
        methods: {
            getDomTree(h, node) {
                let that = this;
                if (node === undefined) {
                    return [];
                }
                if (node.type === 'root' || node.type === 'sp' || node.type === 'cs') {
                    let dom = that.getDomTree(h, node.node)
                    dom.unshift(h('arrow', {
                        props: {node: node},
                        on: {
                            addNode: this.addNode
                        },
                    }, []))
                    return [h('div', {'class': {c: true}}, dom)]
                } else if (node.type === 'condition'
                    && node.conditions !== undefined
                    && node.conditions instanceof Array) {
                    let co = node.conditions.map(cd => {
                        return h('div', {'class': {c: true}}, that.getDomTree(h, cd.node))
                    })
                    return [h('div', {'class': {fc: true}}, [
                        h('div', {'class':{fdr: true}}, co)]),
                        h('arrow', {
                            props: {node: node},
                            on: {
                                addNode: this.addNode
                            },
                        }, that.getDomTree(h, node.node))
                    ];
                } else {
                    return []
                }
            },
            addNode(type, node) {
                let newNode = {
                    name: '新节点',
                    type: type,
                    node: node.node
                }
                node.node = newNode
                this.updateDom()
            },
            delNode(node) {
                console.log(node)
                this.updateDom()
            },
            updateDom() {
				this.updated = false;
                this.$nextTick(() => {
                    this.updated = true
                })
            },
        },
        render(h) {
            return h('div', {'class': {process: true}}, this.updated ? this.getDomTree(h, this.dom) : [])
        }
    }
</script>

<style lang="less" scoped>
	.process {
		display: flex;
		justify-content: center;
	}
	
	.fc {
		display: flex;
		justify-content: center;
	}
	.fdr{
		display: flex;
		flex-direction: row;
	}

</style>
