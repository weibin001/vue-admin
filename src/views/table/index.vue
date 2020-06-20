<template>
  <div class="table-container">
    <div class="table-header-wrapper">
      <el-input class="header-item" v-model="params.title" placeholder="标题" clearable></el-input>
      <el-select class="header-item" v-model="params.importance" placeholder="重要性" clearable filterable>
        <el-option v-for="item in importanceOptions" :key="item" :value="item" :label="item"></el-option>
      </el-select>
      <el-select class="header-item" v-model="params.type" placeholder="类型" clearable filterable>
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :value="item.key"
          :label="item.displayName"
        ></el-option>
      </el-select>
      <el-button class="header-item" icon="el-icon-search" type="primary">搜索</el-button>
      <el-button class="header-item" icon="el-icon-edit" type="primary">添加</el-button>
      <el-button class="header-item" icon="el-icon-download" type="primary">导出</el-button>
    </div>

    <div class="table-body-wrapper">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="{ row }">
            <span>{{ row.timestamp | parseTime }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Author" width="180px">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column width="105px" label="Importance">
          <template slot-scope="{ row }">
            <el-rate :value="row.importance" disabled></el-rate>
            <!-- <svg-icon v-for="item in +row.importance" :key="item" name="star" class="meta-item__icon" /> -->
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{ row }">
            <el-tag :type="row.status | articleStatusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="250px" label="Title">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input v-model="row.title" class="edit-input" size="small" />
              <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit = !row.edit">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
const calendarTypeOptions = [
  { key: 'CN', displayName: 'China' },
  { key: 'US', displayName: 'USA' },
  { key: 'JP', displayName: 'Japan' },
  { key: 'EU', displayName: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: { [key: string]: string }, cur) => {
  acc[cur.key] = cur.displayName
  return acc
}, {}) as { [key: string]: string }
@Component({
  name: 'Table',
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})
export default class extends Vue {
  private params = {
    page: 1,
    limit: 20,
    importance: '',
    title: '',
    type: '',
    sort: '+id'
  }
  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private list: IArticleData[] = []
  private total = 0
  private listLoading = false

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.params)
    this.list = data.items.map((item: IArticleData) => ({ ...item, edit: false, originalTitle: item.title }))
    this.total = data.total || 0
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  position: relative;
  padding: 20px;
}
.table-header-wrapper {
  margin-bottom: 10px;
  .header-item {
    width: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
    &.el-button {
      width: auto;
      & + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>
