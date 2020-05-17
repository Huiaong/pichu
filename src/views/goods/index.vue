<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名搜索">
        <el-input v-model="query.name" placeholder="商品名" />
      </el-form-item>

      <el-form-item label="商品类目搜索">
        <el-select v-model="query.category" placeholder="选择分类" clearable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
      <el-button type="default" @click="refetchData">清空</el-button>
      <el-button type="success" @click="handleCreate">新增</el-button>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="商品类目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="商品状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'success' : 'warning'">{{ scope.row.status == '1' ? '已发布' : '未发布' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品介绍" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createdAt | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row.id)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.pageNo" :limit.sync="query.pageSize" @pagination="fetchData" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="goodsForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商品名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="商品类目" prop="category">
          <el-select v-model="temp.category" class="filter-item" placeholder="Please select">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品单价" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="商品介绍" prop="desc">
          <el-input v-model="temp.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入商品介绍" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, delGoods } from '@/api/goods'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      categoryList: null,
      listLoading: true,
      query: {
        pageNo: 1,
        pageSize: 20,
        name: '',
        category: ''
      },
      total: 0,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: '商品名不能为空', trigger: 'change' }],
        category: [{ required: true, message: '商品类目不能为空', trigger: 'change' }],
        price: [{ required: true, message: '商品单价不能为空', trigger: 'change' }],
        desc: [{ required: true, message: '商品详情不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetchData()
    // getAllCategory().then(res => {
    //   this.categoryList = res.data
    // })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGoodsList(this.query).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },

    refetchData() {
      this.query = {}
      this.fetchData()
    },

    resetTemp() {
      this.temp = {}
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['goodsForm'].clearValidate()
      })
    },

    handleUpdate(id) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['goodsForm'].clearValidate()
      })
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此条记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delGoods(id).then(response => {
          this.$message.success(response.msg)
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  },

  createData() {
    this.$refs['goodsForm'].validate((valid) => {
      if (valid) {
        // createArticle(this.temp).then(() => {
        //   this.list.unshift(this.temp)
        //   this.dialogFormVisible = false
        //   this.$notify({
        //     title: 'Success',
        //     message: 'Created Successfully',
        //     type: 'success',
        //     duration: 2000
        //   })
        // })
      }
    })
  },

  updateData() {
    this.$refs['goodsForm'].validate((valid) => {
      if (valid) {
        // updateArticle(tempData).then(() => {
        //   const index = this.list.findIndex(v => v.id === this.temp.id)
        //   this.list.splice(index, 1, this.temp)
        //   this.dialogFormVisible = false
        //   this.$notify({
        //     title: 'Success',
        //     message: 'Update Successfully',
        //     type: 'success',
        //     duration: 2000
        //   })
        // })
      }
    })
  }
}
</script>
