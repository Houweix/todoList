<template>
    <div class="helper">
        <span class="left">2 项待办</span>
        <span class="tabs">
            <!--filter代表当前选中的状态-->
            <!--增加key提升性能-->
            <span
                    v-for="state in states"
                    :key="state"
                    :class="[state, filter === state ? '未完成' : '']"
                    @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">清除已完成</span>
    </div>
</template>

<script>
    export default {
        props: {
            filter: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                states: ['全部', '未完成', '已完成']
            }
        },
        methods: {
            clearAllCompleted() {
            },
            toggleFilter() {
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        font-smoothing: antialiased
    }

    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }

    .left, .clear {
        width 150px
    }

    .left {
        text-align left
    }

    .clear {
        text-align right
        cursor pointer
    }

    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }
    span::selection {
        background  #fff
    }
</style>