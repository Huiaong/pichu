<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.title" size="mini" placeholder="商品名" style="width: 200px;" class="filter-item" />
      <el-select v-model="query.category" size="mini" placeholder="选择分类" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="fetchData">
        查询
      </el-button>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      size="mini"
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
          <el-button type="primary" size="mini" @click="handleUpdate(row.id)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
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
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      query: {}
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
      getGoodsList(this.query, this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
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
