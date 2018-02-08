<template>
    <section class="real-app">
        <input
                type="text"
                class="add-input"
                autofocus
                placeholder="接下来要做什么？"
                @keyup.enter="addTodo"
        >
        <!--待办列表项-->
        <!--:todo是子组件的props属性 “t odo”是todos中的每一项-->
        <!--@del是监听子组件的emit方法  "deleteTodo"是调用当前父组件的methods方法-->
        <item
                :todo="todo"
                v-for="todo in filteredTodos"
                :key="todos.id"
                @del="deleteTodo"
        />

        <!--监听子组件的toggle-->
        <tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
    import Item from './item.vue';
    import Tabs from './tabs.vue';

    let id = 0;

    export default {
        data() {
            return {
                todos: [],
                filter: '全部'
            }
        },
        methods: {
            //添加列表项
            addTodo(e) {
                id = id++;
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = "";
            },
            //删除列表项
            deleteTodo(id) {
                this.todos.splice(
                    this.todos.findIndex(
                        // 找到todos中id等于子组件传来id的那个项
                        todo => todo.id === id
                    ), 1)
            },
            //切换当前的filter信息
            toggleFilter(state){
                this.filter = state;
            }
        },
        components: {
            Item,
            Tabs
        },
        computed: {
            //被过滤过的todos
            filteredTodos(){
                //全部
                if(this.filter === '全部'){
                    return this.todos;
                }

                //已完成
                //注意此时completed是一个布尔值
                const completed = (this.filter === '已完成' );
                return this.todos.filter(
                    todo =>
                        completed === todo.completed
                )

            }
        }
    }
</script>



<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>