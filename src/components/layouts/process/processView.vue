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
              addNode: this.addNode,
              addCd: this.addCd
            },
          }, []))
          return [h('div', {'class': {c: true}}, dom)]
        } else if (node.type === 'condition'
          && node.conditions !== undefined
          && node.conditions instanceof Array) {
          let co = node.conditions.map(cd => {
            let c = that.getDomTree(h, cd.node)
            c.unshift(h('arrow', {
              props: {node: {name: '条件', type: 'tj'}},
              on: {
                addNode: this.addNode
              },
            }, []))
            return h('div', {'class': {bd: true}}, c)
          })
          return [h('div', {'class': {fc: true}}, [
            h('div', {'class': {fdr: true}}, co)]),
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
      addCd(node) {
        node.node.conditions.push({
            condition: [
              {
                name: "条件1"
              }
            ],
            name: "条件1"
          }
        )
        this.updateDom()
      },
      addNode(type, node) {
        if (type === 'tj') {
          let nextNode = node.node
          node.node = {
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
          }
        } else {
          node.node = {
            name: '新节点',
            type: type,
            node: node.node
          }
        }
        this.updateDom()
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

  .fdr {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    border-top: 1px solid #a9a9a9;
  }

  .bd {
    margin: 0 50px;
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
