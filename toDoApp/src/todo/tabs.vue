<template>
    <div class="helper">
        <span class="left" v-text="unFinishedTodoLength+' 项待办'"></span>
        <span class="tabs">
            <!--filter代表当前选中的状态-->
            <!--增加key提升性能-->
            <!--点击事件发生把当前要过滤的状态通过$emit传给父组件-->
            <span
                    v-for="state in states"
                    :key="state"
                    :class="[state, filter === state ? 'actived' : '']"
                    @click="toggleFilter(state)"
                    v-text="state"
            >
                <!--{{state}}-->
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">清除已完成</span>
    </div>
</template>

<script>
    export default {
        // 父组件向子组件(tabs)用props
        props: {
            filter: {
                type: String,
                required: true,
            },
            todos: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                states: ['全部', '未完成', '已完成']
            }
        },
        methods: {
            //清除已完成
            clearAllCompleted() {
                this.$emit('clearAllCompleted');
            },
            //切换三种状态的过滤器
            toggleFilter(state) {
                this.$emit('toggle',state);
            }
        },
        //把待办项的个数放在计算属性中,当todos变化时会自动计算
        computed: {
            //未完成
            unFinishedTodoLength(){
                //filter是js array的方法  注意条件是!未完成（也就是true）
                return this.todos.filter(todo => !todo.completed).length;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .helper{
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        font-smoothing: antialiased
    }
    .left, .clear, .tabs{
        padding 0 10px
        box-sizing border-box
    }
    .left, .clear{
        width 150px
    }
    .left{
        text-align left
    }
    .clear{
        text-align right
        cursor pointer
    }
    .tabs{
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175,47,47,0)
            &.actived{
                border-color rgba(175,47,47,0.4)
                border-radius 5px
            }
        }
    }
    span::selection {
        background:#fff;
    }
</style>