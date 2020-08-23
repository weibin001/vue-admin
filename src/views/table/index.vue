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
      <virtual-table
        ref="virtualTable"
        v-loading="listLoading"
        style="width: 100%"
        height="600px"
        row-key="ID"
        :data="list"
      >
        <el-table-column type="selection" align="center" label="#" width="55"> </el-table-column>
        <el-table-column type="index" align="center" label="序号" width="80"> </el-table-column>

        <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="{ row }">
            <span>{{ row.timestamp | parseTime('YYYY-MM-DD') }}</span>
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
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{ row }">
            <el-tag>
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="350px" label="Title" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <template v-if="row.editTitle">
              <el-input style="width:220px;margin-right:10px" v-model="row.title" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row, 'title')"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.editTitle"
              type="success"
              size="small"
              icon="el-icon-circle-check"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.editTitle = row.editImportance = true"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>
      </virtual-table>
      <!-- <el-table ref="virtualTable" v-loading="listLoading" :data="list" style="width: 100%" height="600px" row-key="ID">
        <el-table-column type="selection" align="center" label="#" width="55"> </el-table-column>
        <el-table-column type="index" align="center" label="序号" width="80"> </el-table-column>

        <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="{ row }">
            <span>{{ row.timestamp | parseTime('YYYY-MM-DD') }}</span>
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
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{ row }">
            <el-tag>
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="350px" label="Title" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <template v-if="row.editTitle">
              <el-input style="width:220px;margin-right:10px" v-model="row.title" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row, 'title')"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.editTitle"
              type="success"
              size="small"
              icon="el-icon-circle-check"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.editTitle = row.editImportance = true"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import VirtualTable from '@/components/VirtualTable/index.vue'
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
  components: {
    VirtualTable
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})
export default class extends Vue {
  [x: string]: any
  private params = {
    page: 1,
    limit: 200,
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

  private start = 0
  private end = 0

  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.params)
    this.list = data.items.map((item: IArticleData) => ({
      ...item,
      // edit: [], //such as [title,importance]
      editTitle: false,
      // editImportance: false,
      originalTitle: item.title
      // originalImportance: item.importance
    }))
    this.total = data.total || 0
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private cancelEdit(row: any, prop?: string) {
    if (prop) {
      const firstCharCase = prop.replace(prop[0], prop[0].toUpperCase())
      row[prop] = row['original' + firstCharCase]
      row['edit' + firstCharCase] = false
      return
    }
  }

  private confirmEdit(row: any) {
    row.editTitle = false
    row.originalTitle = row.title
    this.$message({
      message: 'The title has been edited',
      type: 'success'
    })
  }

  protected created() {
    this.getList()
  }

  protected mounted() {
    // await this.$nextTick()
    // const virtualTable = this.$refs.virtualTable as IVirtualTable
    // const height: number = virtualTable.fixedBodyHeight.height ? +virtualTable.fixedBodyHeight.height.slice(0, -2) : 0
    // console.log(height)
    // this.end = Math.floor((height / 53) * 2)
    // const throttleScroll = this.$utils.throttle((e: Event) => {
    //   // this.start = Math.floor((e.target as HTMLElement).scrollTop / 53)
    //   // this.end = this.start + 20
    // }, 300)
    // ;(virtualTable.$refs.bodyWrapper as Element).addEventListener('scroll', throttleScroll)
    // console.log(height)
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
