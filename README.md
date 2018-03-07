# vue-webpack打造的ToDo应用

## 功能展示
![](https://github.com/Houweix/vueapp/raw/master/toDoApp/imgs/demo.gif)

[在线预览](http://www.ihouwei.com/todo)

## 项目概述
是一个webpack+vue的综合应用，通过webpack的手动配置实现对vue、jsx、图片以及styl文件的解析和编译。同时使用
cross-env对开发和生产环境的统一配置等等。通过这个app充分的理解了webpack的基本配置和构建，同时对其处理文件的流程有了很好的理解。对vue的组件化、数据的双向绑定也有了一定的理解。以及H5的新特性localStorage本地化存储实现用户数据的保存。

## 项目结构
- todo
	- node_modules
	- src
		- assets
			- images
				- bg.jpg
				- done.svg
				- round.svg
			- style
				- footer.styl
				- global.styl
		- todo
			- footer.jsx
			- header.vue
			- item.vue
			- tabs.vue
			- todo.vue
		- app.vue
		- index.js
	- .babelrc
	- package.json
	- postcss.config.js
	- webapck.config.js

## 核心配置

### 开发和生产环境

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
```

### 解析vue文件
```javascript
//webpack.config.js
const config = {
entry: path.join(__dirname, 'src/index.js'),
output: {
  filename: 'bundle.js',
  path: path.join(__dirname, 'dist'),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
}
```

### 解析stylus文件
```javascript
config.module.rules.push({
    //css预处理器
    test: /\.styl/,
    use: [
        // 注意依赖插件的加载顺序,stylus处理完给css-loader（依赖style-loader），
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                //使用下面的stylus-loader生成的
                sourceMap: true,
            }
        },
        'stylus-loader'
    ]
},);
```

### devServer配置
```javascript
config.devServer = {
        port: '8000',
        // 使用0.0.0.0不仅可以localhost，也可以ip,手机
        host: '0.0.0.0',
        overlay: {
            //让编译中出现的错误显示在网页上
            errors: true,
        },
}
```

### 引入autoprefixer
```javascript
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        //处理css前缀等
        autoprefixer()
    ]
};
```


### JSX
  > React的核心机制之一就是可以在内存中创建虚拟的DOM元素。React利用虚拟DOM来减少对实际DOM的操作从而提升性能。 

  JSX就是Javascript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。

  如何在vue中使用jsx？
  ```javascript
  // webpack.config.js
  {
    test: /\.jsx$/,
    loader: 'babel-loader'
  }

  // 需要的package
  "babel-core": "^6.26.0",
  "babel-helper-vue-jsx-merge-props": "^2.0.3",
  "babel-loader": "^7.1.2",
  "babel-plugin-syntax-jsx": "^6.18.0",
  "babel-plugin-transform-vue-jsx": "^3.5.0"

  // .babelrc
  {
    "presets": [
      "env"
    ],
    "plugins":[
      "transform-vue-jsx"
    ]
  }

  // jsx文件
  import '../assets/style/footer.styl'
  export default {
    data() {
      return {
        author: 'houwei'
      }
    },
    render() {
      return (
        <footer id="footer">
          <span>Written by {this.author}</span>
        </footer>
      )
    }
  }
  ```

## vue开发模式
### vue组件渲染
  在入口index.js文件中，声明Vue，并且挂在到$el元素上(vue2.0版本)。
  ```javascript
  new Vue({
    render: (h) => h(App)
  }).$mount($el)
  ```

  >组件是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 js 特性进行了扩展的原生 HTML 元素。

  ```javascript
  import Header from './todo/header.vue' // 引入组件
  export default {
    components: {
      Header,
    }
  }
  ```
  ```html
  <template>
    <div id='app'>
      <Header/>  <!-- Header组件 -->
  </template>
  ```

----------

### vue组件通信
  > 组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 props 才能下发到子组件中。

#### 父组件->子组件
首先要在子组件要显式地用 props 选项声明它预期的数据。然后在父组件中通过v-bind动态绑定props属性，每当父组件的数据变化时,该变化也会传导给子组件,子组件通过传递来的参数进行操作。
<br>
**父组件**
```html
<item
    :todo="todo"	//下发todo数据
    v-for="todo in filteredTodos"
    :key="todos.id"
    @del="deleteTodo"
/>
```
**子组件**
```html
 <div :class="['todo-item',todo.completed ? 'completed' : '']">
            <!-- v-model= "t odo.completed"  是绑定每个列表行项的状态-->
            <input type="checkbox"
                   class="toggle"
                   v-model="todo.completed"
            >
            <label>{{todo.content}}</label>
            <button class="destory" @click="deleteTodo"></button>
        </div>
```

#### 子组件->父组件
当子组件需要向父组件通信时，需要通过$emit()显式的触发事件，同时可以传递相应的参数。父组件通过监听指定的方法来获取信息。
<br>
**父组件**
```javascript
<item
    :todo="todo"
    v-for="todo in filteredTodos"
    :key="todos.id"
    @del="deleteTodo"
/>
```
**子组件**
```javascript
methods: {
    deleteTodo() {
        // 子组件通知父组件用emit,触发del事件
        this.$emit('del', this.todo.id)
	}
}
```
上述代码父组件监听del方法，子组件有通信消息会触发del。

----------

### vue细节优化
#### transition css过渡
```css
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
```

#### v-text防止数据闪烁
```html
<span class="left" v-text="unFinishedTodoLength+' 项待办'">
</span>
```

## 亮点
使用HTML本地化存储**LocalStorage**实现的用户todo列表的记录功能。
用到的相关知识：
1. HTML5 **LocalStorage**
2. vue声明周期之钩子函数 **mounted**
3. vue监视者watch
4. json


### 实现：
首先是在vue的mountd中读取H5存储的数据（格式规定好，json）：
```javascript
mounted(){
    let length = localStorage.getItem('todosLength');
    for(let i = 0; i < length; i++){
        this.todos.push(
            JSON.parse(localStorage.getItem('todos'+i))
        );
    }
},
```

然后使用vue-watch监视保存todo列表数据的数组todos，每当数据发生变化就更新存储：
```javascript
 watch: {
    todos(){
        //先清除所有的
        localStorage.clear();

        // console.log('保存啦');
        this.todos.forEach(
            (elem, index) => {
                let s = JSON.stringify(elem);
                localStorage.setItem('todos' + index, s);
            }
        );
        localStorage.setItem('todosLength', this.todos.length);
    }

},
```
