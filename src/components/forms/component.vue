
<script>
  import jInput from './atoms/jInput'
  import jDateTime from './atoms/jDateTime'
  import jSelect from './atoms/jSelect'

  export default {
    name: "component",
    props:{
      atom:{
        type: Object
      }
    },
    components:{jInput, jSelect, jDateTime},
    render(h) {
      return h(this.atom.name, {
        props: this.atom.props
      },[]);
    }
  }
</script>

<style scoped>

</style>