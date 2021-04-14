<script>
  import test from "@/assets/approvalTemplate"
  import arrow from "./arrow";
  import {
    nodeType, getDefaultNodeProps
  } from '@/components/common/enumConst'
  
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
        props: getDefaultNodeProps()
      }
    },
    computed: {
      dom() {
        return this.$store.state.template.process
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
        if (node.type === nodeType.ROOT || node.type === nodeType.SP
          || node.type === nodeType.CS || node.type === nodeType.EMPTY) {
          let dom = that.getDomTree(h, node.node)
          dom.unshift(h('arrow', {
            props: {node: node},
            'class': {clear: true},
            on: {
              addNode: this.addNode,
              addCd: this.addCd,
              select: this.select,
              delNode: this.delNode
            },
          }, []))
          return [h('div', {'class': {c: true}}, dom)]
        } else if (node.type === nodeType.CONDITION && node.conditions !== undefined
          && node.conditions instanceof Array) {
          let index = 0;
          let co = node.conditions.map(cd => {
            let c = that.getDomTree(h, cd.node);
            cd.type = nodeType.TJ;
            c.unshift(h('arrow', {
              props: {node: cd},
              on: {
                addNode: this.addNode,
                addCd: this.addCd,
                select: this.select,
                delNode: this.delNode
              },
            }, []))
            index ++;
            return h('div', {
              'class': {
                bd: true,
                bdl: (index === 1),
		            bdr: (node.conditions.length === index)
              }}, c)
          })
          return [h('div', {'class': {fc: true}}, [
            h('div', {'class': {fdr: true, bdtb: true}}, co)]),
            h('div', {
              'class': {
                clear: node.node !== undefined && node.node.type === nodeType.EMPTY,
                pt: node.node !== undefined && node.node.type !== nodeType.EMPTY
              },
              props: {node: node.node},
            }, that.getDomTree(h, node.node))
          ];
        } else {
          return []
        }
      },
      searchParentNode(nodeList, node, nodes) {
        if (node.type === nodeType.TJ && node.id === nodes.id) {
          return true;
        } else if (nodes.node === undefined) {
          return null;
        } else if (nodes.node.id === node.id) {
          return nodes;
        } else if (nodes.node.type === nodeType.CONDITION) {
          for (let item of nodes.node.conditions) {
            let result = this.searchParentNode(nodeList, node, item)
            if (result === true) {
              return nodes
            } else if (result !== null) {
              return item;
            }
          }
          return this.searchParentNode(nodeList, node, nodes.node);
        } else {
          return this.searchParentNode(nodeList, node, nodes.node)
        }
      },
      select(node) {
        this.$emit('select', node);
      },
      getParentNode(node) {
        let nodeResults = [];
        let rs = this.searchParentNode(nodeResults, node, this.dom)
        if (rs !== null) {
          return rs;
        }
        this.$message.warning('糟糕，没有找到需要删除的节点')
        return null;
      },
      addCd(node) {
        node.node.conditions.push({
            condition: [],
            id: this.getId(),
            name: "条件",
            props: JSON.parse(JSON.stringify(this.props)),
            node: {}
          }
        )
      },
      addNode(type, node) {
        if (type === nodeType.TJ) {
          let nextNode = node.node === undefined ? {type: nodeType.EMPTY} : node.node
          this.$set(node, 'node', {
            conditions: [
              {
                condition: [],
                cids:[],
                id: this.getId(),
                type: nodeType.TJ,
                name: "条件",
                props: JSON.parse(JSON.stringify(this.props)),
              }, {
                condition: [],
                cids:[],
                id: this.getId(),
                type: nodeType.TJ,
                name: "条件",
                props: JSON.parse(JSON.stringify(this.props)),
              }
            ],
            id: this.getId(),
            type: nodeType.CONDITION,
            node: nextNode
          })
        } else {
          this.$set(node, 'node', {
            id: this.getId(),
            name: type === nodeType.SP ? '审批人' : '抄送人',
            type: type,
            node: node.node,
            props: JSON.parse(JSON.stringify(this.props)),
          })
	        this.$store.commit('selectedNode', node.node)
          this.select(node.node)
        }
        //this.updateDom()
      },
      delNode(node) {
        let parentNode = this.getParentNode(node);
        if (null !== parentNode) {
          if (nodeType.CONDITION === parentNode.node.type) {
            //删除的是条件节点
            for (let i = 0; i < parentNode.node.conditions.length; i++) {
              if (parentNode.node.conditions[i].id === node.id) {
                parentNode.node.conditions.splice(i, 1)
              }
            }
            //需要去除条件
            if (parentNode.node.conditions.length < 2) {
              let nextBoxNode = parentNode.node.node
              parentNode.node = parentNode.node.conditions[0].node
              parentNode.node.node = nextBoxNode.node
            }
          } else {
            let node = parentNode.node.node
            parentNode.node = node
          }
        }
      },
      getId() {
        return (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString()
          + new Date().getTime().toString().substring(5);
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
		display: flex;
		justify-content: center;
		//width: calc(100% - 220px);
		margin-top: 15px;
		border-top: 2px solid #CACACA;
		border-bottom: 2px solid #CACACA;
	}
	
	.clear {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.fdr {
		/*display: flex;
		flex-direction: row;*/
		position: relative;
	}
	.fdr::after{
		content: "";
		z-index: 100;
		top: 2px;
		left: calc(50% - 1px);
		position: absolute;
		width: 2px;
		height: calc(100% - 2px);
		background: rgb(245, 246, 246);
	}
	
	.pt {
		padding-top: 30px;
	}
	
	.bdl {
		position: relative;
		margin-right: 40px;
	}
	
	.bdr {
		position: relative;
		margin-left: 40px;
	}
	.bd{
		position: relative;
	}
	.bd::after {
		content: "";
		top: 0;
		left: calc(50% - 1px);
		position: absolute;
		width: 2px;
		height: 100%;
		background: #CACACA;
	}
	
	.c::after {display: none}
	
	.bdl::before {
		content: "";
		z-index: 100;
		top: -3px;
		position: absolute;
		width: calc(50% - 1px);
		height: calc(100% - 2px);
		border-bottom: 4px solid #F5F6F6;
		border-top: 4px solid #F5F6F6;
	}
	
	.bdr::before {
		content: "";
		z-index: 100;
		top: -3px;
		right: 0;
		position: absolute;
		width: calc(50% - 1px);
		height: calc(100% - 2px);
		border-bottom: 4px solid #F5F6F6;
		border-top: 4px solid #F5F6F6;
	}
	
	.addTjF {
		display: block;
		position: relative;
		
		.addTj {
			position: absolute;
			top: 0;
		}
	}

</style>
