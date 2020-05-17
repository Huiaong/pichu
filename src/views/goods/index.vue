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
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'success' : 'warning'">{{ scope.row.status == '1' ? '已发布' : '未发布' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品详情" align="center" show-overflow-tooltip>
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
          <el-button type="primary" size="medium" icon="el-icon-edit" @click="handleUpdate(row.id)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="medium" icon="el-icon-delete" type="danger" @click="handleDel(row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.pageNo" :limit.sync="query.pageSize" @pagination="fetchData" />
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
      total: 0
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
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },

    refetchData() {
      this.query = {}
      this.fetchData()
    },

    handleCreate() {
      this.$router.replace('/admin/article/add')
    },

    handleUpdate(id) {
      this.$router.replace('/admin/article/edit/' + id)
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
  }
}
</script>
