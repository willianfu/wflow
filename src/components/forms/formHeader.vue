<template>
	<div class="form-header">
		<p><span>*</span>{{obj.text}}</p>
		<div class="option">
			<i class="el-icon-copy-document" @click="copy"></i>
			<i class="el-icon-delete" @click="del"></i>
		</div>
		<component :is="atom" :disabled="true"></component>
	</div>
</template>

<script>

    export default {
        name: "formHeader",
        props: {
            atom: {
                default: {}
            },
            obj: {
                type: Object
            }
        },
        mounted() {
        },
        methods: {
            copy() {
                this.$emit('onCopy')
            },
            del() {
                this.$emit('onDel')
            }
        }
    }
</script>

<style lang="less" scoped>
	.form-header {
		font-size: small;
		color: #818181;
		text-align: left;
		position: relative;
		background-color: #fff;
		padding: 10px 15px;
		
		p {
			position: relative;
			margin: 0 0 10px 0;
			
			span {
				position: absolute;
				left: -8px;
				top: 3px;
				color: rgb(217, 0, 19);
			}
		}
		
		.option {
			position: absolute;
			top: 5px;
			right: 5px;
			border-radius: 15px;
			background-color: #eceded;
			padding: 3px 6px;
			
			i:first-child {
				margin-right: 8px;
			}
			
			i {
				color: #737373;
				cursor: pointer;
				
				&:first-child:hover {
					color: #1890FF;
				}
				
				&:last-child:hover {
					color: #f56c6c;
				}
			}
		}
	}
</style>
