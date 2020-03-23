<template>
  <el-dialog title="计算公式" :visible.sync="visible" width="800px">
    <div class="g-container">
      <div class="g-aside formula-aside">
        <el-tree :data="controlList" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="g-main formula-main">
        <div
          spellcheck="false"
          contenteditable="true"
          tabindex="0"
          placeholder="例: 数量*单价"
          class="formula-editor"
          @mousedown="onMousedown"
          @keydown="onKeydown"
          @keyup="onKeyup"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
const DocumentRange = {
  // 禁用Enter键自动
  getSelection: function() {
    if (window.getSelection) {
      return window.getSelection()
    }
    return document.getSelection()
  },
  getRange: function(selection) {
    selection = selection || DocumentRange.getSelection()
    try {
      if (selection.getRangeAt) {
        return selection.getRangeAt(0)
      } else {
        var range = document.createRange()
        range.setStart(selection.anchorNode, selection.anchorOffset)
        range.setEnd(selection.focusNode, selection.focusOffset)
        return range
      }
    } catch (e) {
      console.error(e)
    }
  }
}
export default {
  name: 'FormulaEditor',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      controlList: [
        {
          label: '单行文本',
          controlkey: 'F000001'
        },
        {
          label: '多行文本',
          controlkey: 'F000002'
        },
        {
          label: '数字',
          controlkey: 'F000003'
        }
      ]
    }
  },
  methods: {
    handleNodeClick(node) {
      console.log(node)
    },
    onMousedown() {},
    onKeydown() {},
    onKeyup() {}
  }
}
</script>
<style lang="scss">
.formula {
  &-aside {
    width: 200px !important;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  &-main {
    margin-left: 20px;
  }
  &-editor {
    height: 300px;
    padding: 5px;
    overflow: auto;
    border: 1px solid #ddd;
    border-radius: 3px;
    outline: none;
    &:empty::before {
      content: attr(placeholder);
      color: #999999;
    }
  }
}
</style>
