<script>
  import test from "@/assets/approvalTemplate"
  import arrow from "./arrow";
  import {
    nodeType, logicType, getDefaultNodeProps
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
        props: getDefaultNodeProps(),
      }
    },
    computed: {
      dom() {
        return this.$store.state.template.process
      },
      parentMap() {
        return this.$store.state.parentMap
      }
    },
    mounted() {
      console.log("节点：", this.dom)
      console.log("节点map：", this.parentMap)
      //放置跟节点
      this.parentMap.set(this.dom.id, this.dom)
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
        } else {
          this.recoverIdAndPid(node)
        }
        if (node.type === nodeType.ROOT || node.type === nodeType.SP
          || node.type === nodeType.CS || node.type === nodeType.EMPTY) {
          let dom = that.getDomTree(h, node.node)
          that.addArrow(h, node, dom, true)
          return [h('div', {'class': {c: true}}, dom)]
        } else if (node.type === nodeType.CONDITION
          && node.conditions !== undefined
          && node.conditions instanceof Array) {
          let index = 0;
          let co = node.conditions.map(cd => {
            let c = that.getDomTree(h, cd.node);
            cd.type = nodeType.TJ;
            that.addArrow(h, cd, c, false)
            index++;
            return h('div', {
              'class': {
                bd: true,
                bdl: (index === 1),
                bdr: (node.conditions.length === index)
              }
            }, c)
          })
          return [h('div', {'class': {fc: true}}, [
            h('div', {'class': {fdr: true, bdtb: true}}, co)]),
            h('div', {
              'class': {
                clear: !this.isEmptyNode(node.node),
                pt: !this.isEmptyNode(node.node)
              },
              props: {node: node.node},
            }, that.getDomTree(h, node.node))
          ];
        } else {
          return []
        }
      },
      addArrow(h, node, dom, clear) {
        dom.unshift(h('arrow', {
          props: {node: node},
          'class': {clear: clear},
          on: {
            addNode: this.addNode,
            addCd: this.addCd,
            select: this.select,
            delNode: this.delNode
          },
        }, []))
      },
      recoverIdAndPid(node) {
        if (undefined !== node.id) {
          this.parentMap.set(node.id, node)
        }
        //关联到子节点
        if (undefined !== node.node) {
          node.node.pid = node.id
        }
      },
      select(node) {
        this.$emit('select', node);
      },
      addCd(node) {
        let condition = this.getConditionNode(this.getId(), node.node.id,
	        "条件" + (node.node.conditions.length + 1), this.props)
        node.node.conditions.push(condition)
        this.parentMap.set(condition.id, condition)
      },
      addNode(type, node) {
        if (type === nodeType.TJ) {
          let nextNode = {
            type: nodeType.EMPTY,
            id: this.getId(),
            pid: node.id
          }
          //判断下一个节点是否有东西且不为空
          if (!this.isEmptyNode(node.node)) {
            node.node.pid = nextNode.id
            this.$set(nextNode, 'node', node.node)
          }
          let cdId = this.getId()
          this.$set(node, 'node', {
            conditions: [
              this.getConditionNode(this.getId(), cdId, "条件1", this.props),
              this.getConditionNode(this.getId(), cdId, "条件2", this.props)
            ],
            id: cdId,
            pid: node.id,
            type: nodeType.CONDITION,
            node: nextNode
          })
          this.parentMap.set(nextNode.id, nextNode)
          this.parentMap.set(node.node.id, node.node)
          this.parentMap.set(node.node.conditions[0].id, node.node.conditions[0])
          this.parentMap.set(node.node.conditions[1].id, node.node.conditions[1])
        } else {
          this.$set(node, 'node', {
            id: this.getId(),
            pid: node.id,
            name: type === nodeType.SP ? '审批人' : '抄送人',
            type: type,
            node: node.node,
            props: JSON.parse(JSON.stringify(this.props)),
          })
          this.parentMap.set(node.node.id, node.node)
          this.$store.commit('selectedNode', node.node)
          this.select(node.node)
        }
      },
      delNode(node) {
        let parentNode = this.parentMap.get(node.pid)
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
              this.delCondition(parentNode)
            }
          } else {
            if (this.isEmptyNode(node.node)) {
              parentNode.node = undefined
            } else {
              node.node.pid = parentNode.id
              this.$set(parentNode, 'node', node.node)
            }
          }
        } else {
          this.$message.warning("未找到上一级节点")
        }
      },
      getConditionNode(id, pid, name, props) {
        return {
          groups: [//条件分组
            {
              connection: logicType.OR,
              cids: [],
              condition: []
            }
          ],
          connection: logicType.AND,
          pid: pid,
          id: id,
          type: nodeType.TJ,
          name: name,
          props: JSON.parse(JSON.stringify(props)),
        }
      },
      delCondition(parentNode) {
        //获取条件块上方节点
        let pnode = this.parentMap.get(parentNode.pid)
        //取出条件块下方节点
        let nextBoxNode = parentNode.node
        //取出第一个条件分支下方节点
        let cdSonNode = parentNode.conditions[0].node
        //将分支节点连接到主分支
        if (!this.isEmptyNode(cdSonNode)) {
          cdSonNode.pid = pnode.id
          this.$set(pnode, 'node', cdSonNode)
        } else if (this.isEmptyNode(nextBoxNode.node)) {
          //只剩下根节点
          pnode.node = undefined
        } else {
          nextBoxNode.node.pid = pnode.id
          this.$set(pnode, 'node', nextBoxNode.node)
          cdSonNode = pnode
        }
        //将下节点连接到主分支尾部
        if (!this.isEmptyNode(nextBoxNode.node)) {
          let lastNode = this.getDomFooterNode(cdSonNode)
          nextBoxNode.node.pid = lastNode.id
          this.$set(lastNode, 'node', nextBoxNode.node)
        }
      },
      isEmptyNode(node) {
        return undefined === node
          || null === node
          || undefined === node.type
          || nodeType.EMPTY === node.type
      },
      getId() {
        return (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString()
          + new Date().getTime().toString().substring(5, 11);
      },
      /**
       * 搜索末端非空节点
       * @param node
       */
      getDomFooterNode(node) {
        if (node && !this.isEmptyNode(node.node)) {
          return this.getDomFooterNode(node.node)
        } else {
          return node
        }
      }
    },
    render(h) {
      return h('div', {'class': {process: true}},
        this.updated ? this.getDomTree(h, this.dom) : [])
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
	
	.fdr::after {
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
	
	.bd {
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
	
	.c::after {
		display: none
	}
	
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
