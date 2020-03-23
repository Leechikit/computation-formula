<template>
  <div class="home">
    <el-button type="text" @click="formulaEditorVisible = true"
      >打开计算公式的 Dialog</el-button
    >
    <FormulaEditor :visible="formulaEditorVisible"></FormulaEditor>
  </div>
</template>

<script>
// @ is an alias to /src
import FormulaEditor from '@/components/FormulaEditor.vue'

export default {
  name: 'Home',
  components: {
    FormulaEditor
  },
  data() {
    return {
      formulaEditorVisible: false
    }
  }
}
</script>
