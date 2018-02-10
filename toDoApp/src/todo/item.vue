<template>
    <transition name="slide-fade">
        <div :class="['todo-item',todo.completed ? 'completed' : '']">
            <!-- v-model= "t odo.completed"  是绑定每个列表行项的状态-->
            <input type="checkbox"
                   class="toggle"
                   v-model="todo.completed"
            >
            <label>{{todo.content}}</label>
            <button class="destory" @click="deleteTodo"></button>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            todo: {
                type: Object,
                required: true,
            }
        },
        methods: {
            deleteTodo() {
                // 子组件通知父组件用emit,触发del事件
                this.$emit('del', this.todo.id)
            }
        }
    }
</script>


<style lang="stylus" scoped>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .7s ease
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px)
        opacity: 0
    }


    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .destory:after{
                content: '×'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        &:after{
            content url('../assets/images/round.svg')
        }
        &:checked:after{
            content url('../assets/images/done.svg')
        }
    }
    .destory{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>