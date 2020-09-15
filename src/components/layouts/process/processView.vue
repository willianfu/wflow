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
      }
    },
		computed:{
      dom(){
        return this.$store.state.process
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
        if (node.type === 'root' || node.type === 'sp'
          || node.type === 'cs' || node.type === 'empty') {
          let dom = that.getDomTree(h, node.node)
          dom.unshift(h('arrow', {
            props: {node: node},
            'class': {clear: true},
            on: {
              addNode: this.addNode,
              addCd: this.addCd
            },
          }, []))
          return [h('div', {'class': {c: true}}, dom)]
        } else if (node.type === 'condition' && node.conditions !== undefined
          && node.conditions instanceof Array) {
          let co = node.conditions.map(cd => {
            let c = that.getDomTree(h, cd.node);
            cd.type = 'tj';
            c.unshift(h('arrow', {
              props: {node: cd},
              on: {
                addNode: this.addNode
              },
            }, []))
            return h('div', {'class': {bd: true}}, c)
          })
          return [h('div', {'class': {fc: true}}, [
            h('div', {'class': {fdr: true, bdtb: true}}, co)]),
            h('div', {
              'class': {
                clear: node.node !== undefined && node.node.type === 'empty',
                pt: node.node !== undefined && node.node.type !== 'empty'
              },
              props: {node: node.node},
            }, that.getDomTree(h, node.node))
          ];
        } else {
          return []
        }
      },
      addCd(node) {
        node.node.conditions.push({
            condition: [
              {
                name: "条件1"
              }
            ],
            name: "条件1",
            node: {}
          }
        )
      },
      addNode(type, node) {
        if (type === 'tj') {
          let nextNode = node.node === undefined ? {type: 'empty'} : node.node
          this.$set(node, 'node', {
            conditions: [
              {
                condition: [
                  {
                    name: "条件1"
                  }
                ],
                name: "条件1",
              }, {
                condition: [
                  {
                    name: "条件2"
                  }
                ],
                name: "条件2",
              }
            ],
            type: 'condition',
            node: nextNode
          })
        } else {
          this.$set(node, 'node', {
            name: '新节点',
            type: type,
            node: node.node
          })
        }
        //this.updateDom()
      },
      delNode(node) {
        console.log(JSON.stringify(node))
        this.updateDom()
      },
      updateDom() {
        console.log(JSON.stringify(this.dom))
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
	
	.bdtb {
		margin-top: 15px;
		border-top: 2px solid #CACACA;
		border-bottom: 2px solid #CACACA;
	}
	
	.clear {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.fdr {
		display: flex;
		flex-direction: row;
	}
	
	.pt {
		padding-top: 30px;
	}
	
	/*.bd::before {
		content: "";
		z-index: -999;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 2px;
		height: 100%;
		background-color: #CACACA;
	}*/
	
	.addTjF {
		display: block;
		position: relative;
		
		.addTj {
			position: absolute;
			top: 0;
		}
	}

</style>
