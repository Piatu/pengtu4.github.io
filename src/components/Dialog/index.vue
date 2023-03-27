<template>
  <!-- 定义v-show绑定的是visibl，shopcart给在data中给了初始值false它不显示点击才会显示 -->
  <div class="dialog" v-show="visible">
    <div class="dialog-wrap">
      <div class="dialog-header">
        <slot name="header" />
        <!-- 增加点击x让弹框关闭 -->
        <button class="dialog-header-close" @click="close">X</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  //接受shopcart传递过来的visible且给它定义类型
  props: {
    visible: {
      //数据类型
      type: Boolean,
      //必须传
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style lang="less" scoped>
.dialog {
  // 最外层
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

// 内层水平垂直居中
.dialog-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 230px;
  box-sizing: border-box; // 内减模式
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
// 头部
.dialog-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  .dialog-header-close {
    border: none; // 去掉边框
    outline: none; // 去掉环绕线
    background-color: transparent; // 透明色
    cursor: pointer;
  }
}
// 中间
.dialog-body {
  text-align: center;
  font-size: 16px;
  // padding: 10px;
}
.btn-footer {
  position: absolute;
  right: 40px;
  bottom: 20px;
  .btn {
    width: 62px;
    height: 32px;
    font-size: 14px;
    margin-left: 16px;
    border-width: 1px;
    border-radius: 10%;
    cursor: pointer;
    &.primary {
      background-color: rgb(102, 177, 255);
      color: #fff;
    }
  }
}
</style>