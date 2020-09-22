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
        if (node.type === 'root' || node.type === 'sp'
          || node.type === 'cs' || node.type === 'empty') {
          let dom = that.getDomTree(h, node.node)
          dom.unshift(h('arrow', {
            props: {node: node},
            'class': {clear: true},
            on: {
              addNode: this.addNode,
              addCd: this.addCd,
              delNode: this.delNode
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
                addNode: this.addNode,
                addCd: this.addCd,
                delNode: this.delNode
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
	    searchParentNode(nodeList, node, nodes){
        if (node.type === 'tj' && node.id === nodes.id){
					return true;
        } else if (nodes.node === undefined){
          return null;
        } else if (nodes.node.id === node.id) {
          return nodes;
        } else if (nodes.node.type === 'condition'){
          for (let item of nodes.node.conditions){
            let result = this.searchParentNode(nodeList, node, item)
            if (result === true){
              return nodes
            }else if (result !== null){
              return item;
            }
          }
          return this.searchParentNode(nodeList, node, nodes.node);
        }else{
          return this.searchParentNode(nodeList, node, nodes.node)
        }
	    },
      getParentNode(node){
        let nodeResults = [];
        let rs = this.searchParentNode(nodeResults, node, this.dom)
        if (rs !== null){
          return rs;
        }
        this.$message.warning('糟糕，没有找到需要删除的节点')
	      return null;
      },
      addCd(node) {
        node.node.conditions.push({
            condition: [
              {
                name: "条件1"
              }
            ],
	          id: this.getId(),
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
                id: this.getId(),
                type: 'tj',
                name: "条件1",
              }, {
                condition: [
                  {
                    name: "条件2"
                  }
                ],
                id: this.getId(),
                type: 'tj',
                name: "条件2",
              }
            ],
            id: this.getId(),
            type: 'condition',
            node: nextNode
          })
        } else {
          this.$set(node, 'node', {
            id: this.getId(),
            name: '新节点',
            type: type,
            node: node.node
          })
        }
        //this.updateDom()
      },
      delNode(node) {
	      let parentNode = this.getParentNode(node);
	      if (null !== parentNode){
	        if ('condition' === parentNode.node.type){
	          //删除的是条件节点
            for (let i =0; i< parentNode.node.conditions.length; i++) {
	            if (parentNode.node.conditions[i].id === node.id){
                parentNode.node.conditions.splice(i, 1)
	            }
            }
            //需要去除条件
            if (parentNode.node.conditions.length < 2){
              let nextBoxNode = parentNode.node.node
              parentNode.node = parentNode.node.conditions[0].node
              parentNode.node.node = nextBoxNode.node
            }
	        }else {
            let node = parentNode.node.node
            parentNode.node = node
	        }
	      }
      },
	    getId(){
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
