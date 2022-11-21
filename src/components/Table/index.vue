<template>
  <table class="table-wrap">
    <thead ref="thead">
      <tr>
        <th
          v-for="(item, index) in columns"
          :key="index"
          :style="{
            color: item.color || '#222',
            backgroundColor: item.backgroundColor || '#f5f5f5'
          }"
        >{{item.title}}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in dataSource">
        <tr :key="index" @click="showChildren(index)">
          <td v-for="(subItem, subIndex) in columns" :key="subIndex">
            <b class="sj" :class="{active: show.indexOf(index) != -1}" v-if="subIndex === 0">s</b>
            {{getValue(item, subItem.key)}}
            <slot v-if="subItem.name" :name="subItem.name" :row="item"></slot>
          </td>
        </tr>
        <tr
          v-show="show.indexOf(index) != -1"
          v-for="(childItem, childIndex) in item.children"
          :key="index + 'child' + childIndex"
        >
          <td v-for="(subItem, subIndex) in columns" :key="subIndex">
            {{getValue(childItem, subItem.key)}}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'el-table',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: []
    }
  },
  mounted () {
    if (this.sticky) this.initSticky()
  },
  methods: {
    initSticky () {
      this.$refs.thead.style.postion = 'sticky'
      this.$refs.thead.style.top = '0'
    },
    showChildren (index) {
      const atIndex = this.show.indexOf(index)
      if (atIndex !== -1) {
        this.show.splice(atIndex, 1)
      } else {
        this.show.push(index)
      }
    },
    getValue (obj, path) {
      if (!path) return
      const pathArr = path.split('.')
      let value = obj
      pathArr.forEach(key => {
        value = value[key]
      })
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  thead {
    th {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      font-weight: normal;
      background: #f5f5f5;
      border-right: 1px solid #fff;
      &:last-child {
        border-right: 0;
      }
      &:first-child {
        text-align: left;
        padding-left: 10px;
      }
    }
  }
  tbody {
    td {
      font-size: 12px;
      text-align: center;
      position: relative;
      &:first-child {
        text-align: left;
        padding-left: 10px;
      }
      .sj {
          content: ".";
          font-size: 0;
          line-height: 0;
          display: block;
          position: absolute;
          width: 2.133vw;
          height: 1.6vw;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: url(//mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/area_down.png);
          background-size: 100% 100%;
          &.active {
            transform: translateY(-50%) rotate(180deg);
          }
      }
    }
  }
}
</style>
