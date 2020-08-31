<template>
  <el-main>
    <el-card class="box-card">
      <avue-crud
        ref="crud"
        :data="playlists"
        v-model="playlist"
        :option="crudOption"
        :page="page"
        :table-loading="loading"
        :before-open="handelBeforeOpen"
        @row-save="handleSave"
        @row-update="handleUpdate"
        @row-del="handleDelete"
        @refresh-change="handleRefresh"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        @row-dblclick="handleDBClick"
      ></avue-crud>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    let MONTH = Array.from({ length: 31 }, (v, i) => i + 1);
    for (let i = 1; i < 32; i++) {
      let obj = {
        value: i,
        label: i
      };
      MONTH[MONTH.length] = obj;
    }
    let WEEK = [
      {
        value: "1",
        label: "周一"
      },
      {
        value: "2",
        label: "周二"
      },
      {
        value: "3",
        label: "周三"
      },
      {
        value: "4",
        label: "周四"
      },
      {
        value: "5",
        label: "周五"
      },
      {
        value: "6",
        label: "周六"
      },
      {
        value: "7",
        label: "周日"
      }
    ];

    let validateTime = (rule, value, callback) => {
      // console.log('value: ', value);
      if (this.times.length < 1) {
        callback(new Error("请选择至少一个时间段"));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      playlist: {},
      crudOption: {
        title: "播放列表",
        ref: "playlistForm",
        stripe: true,
        border: true,
        dialogType: "drawer",
        index: true,
        indexLabel: "#",
        labelWidth: 110,
        menuWidth: 200,
        menuAlign: "left",
        editBtn: false,
        delBtn: false,
        column: [
          {
            label: "名称",
            prop: "name",
            rules: [{ required: true, message: "请输入名称" }]
          },
          {
            label: "播放模式",
            prop: "playingMode",
            type: "select",
            dicUrl: "PLAYING_MODES_URL",
            props: {
              label: "kind",
              value: "id"
            },
            rules: [{ required: true, message: "请选择播放模式" }]
          },
          // 是否公开
          {
            label: "是否公开",
            prop: "type",
            type: "switch",
            slot: true,
            dicData: [
              { label: "私有", value: "private" },
              { label: "公开", value: "public" }
            ],
            value: "private",
            align: "center"
          },
          {
            label: "重复周期",
            prop: "cycleType",
            type: "radio",
            dicData: [
              { label: "临时", value: "time" },
              { label: "每天", value: "daily" },
              { label: "每周", value: "weekly" },
              { label: "每月", value: "monthly" }
            ],
            value: "time",
            align: "center"
          },
          {
            label: "临时",
            type: "date",
            prop: "temporary",
            display: false,
            rules: [{ required: true, message: "请选择日期" }]
          },
          {
            label: "每周",
            type: "select",
            prop: "weekly",
            multiple: true,
            dicData: WEEK,
            props: {
              label: "label",
              value: "value"
            },
            display: false
          },
          {
            label: "每月",
            type: "select",
            prop: "monthly",
            multiple: true,
            dicData: MONTH,
            props: {
              label: "label",
              value: "value"
            },
            display: false
          },
          {
            label: "播放时间段",
            prop: "times",
            hide: true,
            showColumn: false,
            row: true,
            span: 24,
            formslot: true,
            rules: [{ validator: validateTime, trigger: "blur" }]
          },
          {
            label: "广告列表",
            prop: "advertisements",
            hide: true,
            showColumn: false,
            row: true,
            span: 24,
            formslot: true,
            rules: [{ required: true, message: "请选择至少一个广告资源" }]
          },
          { label: "说明", prop: "description", row: true, span: 24 }
        ]
      }
    };
  },
  methods: {
    load(page, isRefresh) {
      console.log('isRefresh: ', isRefresh);
      this.playlists=[];
      //加载数据
    },
    // 创建/修改对话框
    handelBeforeOpen(done, type) {
      if (type === "add") {
        console.log('type: ', type);
      }
      if (type === "edit") {
        console.log('type: ', type);
      }
      done();
    },
    handlePageChange(page) {
      this.load(Object.assign(this.page, { currentPage: page }));
    },
    // 创建
    handleSave(row, done, loading) {
      console.log('row, done, loading: ', row, done, loading);
    },
    crudRowEdit(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    // 修改
    handleUpdate(row, index, done, loading) {
      console.log('index: ', index);
      this.$message.success("播放列表修改成功！");
      this.load(Object.assign(this.page, { pageSize: this.page.pageSize }));
      loading();
      done();
    },
    handleDelete(row, index) {
      console.log('row, index: ', row, index);
      this.$confirm(
        `此操作将永久删除该播放列表“${row.name}”，是否继续？`,
        "提示"
      )
        .then(() => {
          this.remove(row.id)
            .then(() => {
              this.$message(`播放列表“${row.name}”删除成功！`);
            })
            .catch(err => {
              this.alert(err, "错误");
            });
        })
        .catch(() => {});
    },
    handleRefresh() {
      this.loading = true;
      this.load(this.page, true);
    },
    // 切换分页数量
    handleSizeChange(pageSize) {
      this.load(Object.assign(this.page, { pageSize: pageSize }));
    },
    // 双击
    handleDBClick(row, event) {
      console.log('event: ', event);
      row.user === this.userInfo.id && this.$refs.crud.rowEdit(row, row.$index);
    },
    handleSelectionChange(selection) {
      this.playlist.advertisements = selection;
    }
  },
  created() {
    this.load(this.page, false);
  }
};
</script>

<style lang="scss" scoped>
</style>