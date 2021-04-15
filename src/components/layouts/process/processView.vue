<script>
  import test from "@/assets/approvalTemplate"
  import arrow from "./arrow";
  import {
    nodeType, getDefaultNodeProps
  } from '@/components/common/enumConst'
  
  //节点ID关系映射
  const parentMap = new Map();
  
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
        props: getDefaultNodeProps(),
      }
    },
    computed: {
      dom() {
        return this.$store.state.template.process
      }
    },
    mounted() {
      console.log("节点：", this.dom)
      console.log("节点map：", parentMap)
    },
    methods: {
      /**
       * 将对象映射为dom，这里改进下节点遍历算法，由于每次点击的都是子对象，
       * 导致每次需要操作父节点时都需要从顶部往下递归遍历，容易出错且性能差劲，
       * 将对象嵌套关系映射为map(当前ID, 本对象)，O1就能取出父级对象
       * @param h
       * @param node
       * @returns {*[]|Array|*[]}
       */
      getDomTree(h, node) {
        let that = this;
        if (node === undefined) {
          return [];
        }else {
          console.log('------>' + node.id)
          if (undefined !== node.id){
            parentMap.set(node.id, node)
          }
          //关联到子节点
          if (undefined !== node.node){
            node.node.pid = node.id
          }
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
        } else if (node.type === nodeType.CONDITION
	        && node.conditions !== undefined
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
      /**
       * 递归搜索父节点，已废弃
       * @deprecated
       * @param nodeList
       * @param node
       * @param nodes
       * @returns {null|*|boolean|null|{condition, name, cids, id, type, props}|boolean}
       */
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
      /**
       * @deprecated
       * @param node
       * @returns {null|*}
       */
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
	          pid: node.node.id,
            name: "条件" + (node.node.conditions.length + 1),
            props: JSON.parse(JSON.stringify(this.props)),
            node: {}
          }
        )
      },
      addNode(type, node) {
        if (type === nodeType.TJ) {
          let nextNode = node.node === undefined ?
	          {type: nodeType.EMPTY, id: this.getId()} : node.node
          let cdId = this.getId()
          this.$set(node, 'node', {
            conditions: [
              {
                condition: [],
                cids:[],
	              pid: cdId,
                id: this.getId(),
                type: nodeType.TJ,
                name: "条件1",
                props: JSON.parse(JSON.stringify(this.props)),
              }, {
                condition: [],
                cids:[],
                pid: cdId,
                id: this.getId(),
                type: nodeType.TJ,
                name: "条件2",
                props: JSON.parse(JSON.stringify(this.props)),
              }
            ],
            id: cdId,
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
        //let parentNode = this.getParentNode(node);
        let parentNode = parentMap.get(node.pid)
        if (parentNode) {
          if (nodeType.CONDITION === parentNode.type) {
            //删除的是条件节点
            for (let i = 0; i < parentNode.conditions.length; i++) {
              if (parentNode.conditions[i].id === node.id) {
                parentNode.conditions.splice(i, 1)
              }
            }
            //只剩一条条件则需要去除条件，把条件1合并到主分支
            if (parentNode.conditions.length < 2) {
              //获取条件块上方节点
              let pnode = parentMap.get(parentNode.pid)
              //取出条件块下方节点
              let nextBoxNode = parentNode.node
	            //取出第一个条件分支下方节点
              let cdSonNode = parentNode.conditions[0].node
	            //将分支节点连接到主分支
	            if (cdSonNode && cdSonNode.type !== nodeType.EMPTY){
                cdSonNode.pid = pnode.id
	              this.$set(pnode, 'node', cdSonNode)
	            }else {
                cdSonNode = pnode
	            }
	            //将下节点连接到主分支尾部
	            if (nextBoxNode && nextBoxNode.type !== nextBoxNode.EMPTY){
                let lastNode = this.getDomFooterNode(cdSonNode)
                nextBoxNode.pid = lastNode.id
                this.$set(lastNode, 'node', nextBoxNode)
              }
            }
          } else {
            let node = parentNode.node.node
	          this.$set(parentNode, 'node', node)
            //parentNode.node = node
          }
        }else {
          this.$message.warning("未找到上一级节点")
        }
      },
      getId() {
        return (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString()
          + new Date().getTime().toString().substring(5, 11);
      },
      /**
       * 搜索末端非空节点
       * @param node
       */
	    getDomFooterNode(node){
        if (node && node.node && node.node.type !== nodeType.EMPTY){
          return this.getDomFooterNode(node)
        }else {
          return node
        }
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
		margin-right: 0px;
	}
	
	.bdr {
		position: relative;
		margin-left: 0px;
	}
	.bd{
		position: relative;
		margin: 0 20px;
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
		left: -20px;
		position: absolute;
		width: calc(50% + 20px - 1px);
		height: calc(100% - 2px);
		border-bottom: 4px solid #F5F6F6;
		border-top: 4px solid #F5F6F6;
	}
	
	.bdr::before {
		content: "";
		z-index: 100;
		top: -3px;
		right: -20px;
		position: absolute;
		width: calc(50% + 20px - 1px);
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
