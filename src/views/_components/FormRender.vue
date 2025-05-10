<template>
  <div class="render-container">
    <!-- <div v-if="widgetForm.list.length == 0" class="form-empty">
      {{ $t('fm.description.containerEmpty') }}
    </div> -->
    <el-form
      :size="widgetForm.config.size"
      label-suffix=":"
      :label-position="widgetForm.config.labelPosition"
      :label-width="widgetForm.config.labelWidth + 'px'"
    >
      <draggable
        class=""
        v-model="widgetForm.list"
        v-bind="{ group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget' }"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in widgetForm.list">
            <template v-if="element.type == 'grid'">
              <el-row
                class="widget-col widget-view"
                v-if="element && element.key"
                :key="element.key"
                type="flex"
                :class="{ active: widgetFormSelect.key == element.key }"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{
                      group: { name: 'people', put: handlePut },
                      ghostClass: 'ghost',
                      animation: 200,
                      handle: '.drag-widget',
                    }"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex, index)"
                  >
                    <transition-group name="fade" tag="div" class="widget-col-list">
                      <template v-for="(el, i) in col.list">
                        <!-- {{ el }} -->ddd
                        <!-- <widget-form-item                             
                              :key="el.key"
                              v-if="el.key"
                              :element="el" 
                              :select.sync="widgetFormSelect" 
                              :index="i" 
                              :data="col">
                            </widget-form-item> -->
                      </template>
                    </transition-group>
                  </draggable>
                </el-col>
                <div
                  class="widget-view-action widget-col-action"
                  v-if="widgetFormSelect.key == element.key"
                >
                  <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
                </div>

                <div
                  class="widget-view-drag widget-col-drag"
                  v-if="widgetFormSelect.key == element.key"
                >
                  <i class="iconfont icon-drag drag-widget"></i>
                </div>
              </el-row>
            </template>
            <template v-else>
              ccc
              <!-- {{ element }} -->
              <!-- <widget-form-item v-if="element && element.key"  :key="element.key" 
              :element="element" :select.sync="widgetFormSelect" :index="index" :data="widgetForm">
            </widget-form-item> -->
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// 看起来pinia的全局状态不能做响应式。 弄个响应式变量。
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { blocksRender } from '@/stores/blocksRender';
import { storeToRefs } from 'pinia';
const useBlockRender = blocksRender();
const { widgetForm, widgetFormSelect } = storeToRefs(useBlockRender);
const { handleBlockAdd, handleSelectBlock, handleBlockColAdd, handleBlockDelete } = useBlockRender;
const handleMoveEnd = ({ newIndex, oldIndex }) => {
  console.log('index', newIndex, oldIndex);
};
const handleWidgetAdd = (evt) => {
  console.log('🚀 ~ handleWidgetAdd ~ evt:', evt, evt.to);
  handleBlockAdd(evt.newIndex);
};
const handlePut = (a, b, c) => {
  if (
    c.className.split(' ').indexOf('widget-col') >= 0 ||
    c.className.split(' ').indexOf('no-put') >= 0
  ) {
    return false;
  }
  return true;
};
// TODO 不应该这么使用， 应该通过下标一层一层访问进去,加了个index(rowIndex)
const handleWidgetColAdd = ($event, row, colIndex, index) => {
  console.log('coladd', $event, row, colIndex, $event.oldIndex, $event.item);
  handleBlockColAdd(row, colIndex, $event.newIndex, index);
};
const handleSelectWidget = (index) => {
  handleSelectBlock(index);
};
const handleWidgetDelete = (index) => {
  handleBlockDelete(index);
};
</script>

<style lang="scss" scoped>
.render-container {
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  .form-empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .widget-form-list {
    background: #fff;
    border: 1px dashed #999;
    /* 需要具体的高度*/
    min-height: 600px;
    // margin: 10px;
    .widget-col-list {
      min-height: 50px;
      border: 1px dashed #ccc;
      background: #fff;
    }

    .widget-view {
      padding-bottom: 18px;
      position: relative;
      border: 1px dashed rgba(170, 170, 170, 0.7);
      background-color: rgba(236, 245, 255, 0.3);
      margin: 2px;

      .el-form-item__content {
        position: unset;
      }

      &.is_req {
        .el-form-item__label::before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
      }

      .widget-view-description {
        height: 15px;
        line-height: 15px;
        font-size: 13px;
        margin-top: 6px;
        color: #909399;
      }

      .widget-view-action {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 28px;
        line-height: 28px;
        background: var(--primary-color);
        z-index: 9;

        i {
          font-size: 14px;
          color: #fff;
          margin: 0 5px;
          cursor: pointer;
        }
      }

      .widget-view-drag {
        position: absolute;
        left: -2px;
        top: -2px;
        bottom: -18px;
        height: 28px;
        line-height: 28px;
        background: var(--primary-color);
        z-index: 9;
        // display: none;

        i {
          font-size: 14px;
          color: #fff;
          margin: 0 5px;
          cursor: move;
        }
      }

      &:after {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
      }

      &:hover {
        background: var(--primary-background-color);
        outline: 1px solid var(--primary-color);
        outline-offset: 0px;

        &.active {
          outline: 2px solid var(--primary-color);
          border: 1px solid var(--primary-color);
          outline-offset: 0;
        }

        .widget-view-drag {
          display: block;
        }
      }

      &.active {
        outline: 2px solid var(--primary-color);
        border: 1px solid var(--primary-color);
      }

      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: '';
        overflow: hidden;
        padding: 0;
      }
    }

    .widget-table {
      padding-bottom: 0;
      padding: 5px;
      background-color: rgba(253, 246, 236, 0.3);

      .widget-table-wrapper {
        min-height: 50px;
        background: #fff;
        display: flex;
        justify-content: flex-start;

        .widget-table-row {
          td {
            border-bottom: 0;
          }
        }

        .widget-table-left {
          width: 51px;
          border-left: 1px solid #ebeef5;
          border-right: 1px solid #ebeef5;
          border-top: 1px solid #ebeef5;
          flex: none;
        }

        .widget-table-view {
          border: 1px solid #ebeef5;
          width: 200px;
          float: left;
          height: 100%;
          position: relative;
          display: block;

          .el-table {
            height: 100%;
          }

          &.is_req {
            .el-form-item__label::before {
              content: '*';
              color: #f56c6c;
              margin-right: 4px;
            }
          }

          .widget-view-description {
            height: 15px;
            line-height: 15px;
            font-size: 13px;
            margin-top: 6px;
            color: #909399;
          }

          .widget-view-action {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 28px;
            line-height: 28px;
            background: var(--primary-color);
            z-index: 9;

            i {
              font-size: 14px;
              color: #fff;
              margin: 0 5px;
              cursor: pointer;
            }
          }

          .widget-view-drag {
            position: absolute;
            left: -2px;
            top: -2px;
            bottom: -18px;
            height: 28px;
            line-height: 28px;
            background: var(--primary-color);
            z-index: 9;
            // display: none;

            i {
              font-size: 14px;
              color: #fff;
              margin: 0 5px;
              cursor: move;
            }
          }

          &::after {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: block;
            content: '';
          }

          &::before {
            display: none;
          }

          &:hover {
            background: var(--primary-background-color);
            outline: 1px solid var(--primary-color);
            outline-offset: -1px;

            &.active {
              // outline: 1px solidvar(--primary-color)
              border: 1px solid var(--primary-color);
              outline: 1px solid var(--primary-color);
              outline-offset: -1px;
            }

            .widget-view-drag {
              display: block;
            }
          }

          &.active {
            outline: 1px solid var(--primary-color);
            border: 1px solid var(--primary-color);
            outline-offset: -1px;
          }

          &.ghost {
            background: #f56c6c;
            outline-width: 0;
            width: 5px !important;
            box-sizing: border-box;
            font-size: 0;
            content: '';
            overflow: hidden;
            padding: 0;
            position: relative;
            outline: none !important;
            border: 0 !important;

            &::after {
              background: #f56c6c;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              z-index: 9999;
              content: '';
              outline: none;
            }
          }
        }

        .widget-table-content {
          width: 100%;
          // border: 1px dashed #ccc;
          outline: 1px dashed #ccc;
          background: #fff;
          flex: 1;
          margin: 0 1px;
          overflow: auto;

          & > div {
            height: 100%;
          }

          .widget-table-col {
            height: 100%;

            .ghost {
              background: #f56c6c;
              // border: 2px solid #F56C6C;
              position: relative;
              content: '';
              float: left;
              height: 100%;
              width: 5px !important;
              list-style: none;
              font-size: 0;
              overflow: hidden;
              outline: none;

              &::after {
                background: #f56c6c;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 9999;
                content: '';
                outline: none;
              }
            }
          }
        }
      }

      &.active {
        outline: 2px solid #e6a23c;
        border: 1px solid #e6a23c;
      }

      &:hover {
        background: #fdf6ec;
        outline: 1px solid #e6a23c;
        outline-offset: 0px;

        &.active {
          outline: 2px solid #e6a23c;
          border: 1px solid #e6a23c;
          outline-offset: 0;
        }
      }

      .widget-view-action.widget-col-action {
        background: #e6a23c;
      }

      .widget-view-drag.widget-col-drag {
        background: #e6a23c;
      }

      &::after {
        display: none;
      }

      &.ghost {
        background: #f56c6c;
        outline-width: 0;
        height: 5px;
        box-sizing: border-box;
        font-size: 0;
        content: '';
        overflow: hidden;
        padding: 0;
        position: relative;
        outline: none;
        border: 0;

        &::after {
          background: #f56c6c;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          content: '';
          display: block;
          z-index: 999;
        }
      }
    }

    .widget-col {
      padding-bottom: 0;
      padding: 5px;
      // margin-left: 2px !important;
      // margin-right: 2px !important;
      background-color: rgba(253, 246, 236, 0.3);

      &.active {
        outline: 2px solid #e6a23c;
        border: 1px solid #e6a23c;
      }

      &:hover {
        background: #fdf6ec;
        outline: 1px solid #e6a23c;
        outline-offset: 0px;

        &.active {
          outline: 2px solid #e6a23c;
          border: 1px solid #e6a23c;
          outline-offset: 0;
        }
      }

      .el-col {
        min-height: 50px;
      }

      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: '';
        overflow: hidden;
        padding: 0;
      }

      .widget-view-action.widget-col-action {
        background: #e6a23c;
      }

      .widget-view-drag.widget-col-drag {
        background: #e6a23c;
      }

      &::after {
        display: none;
      }
    }

    .ghost {
      background: #f56c6c;
      border: 2px solid #f56c6c;
      outline-width: 0;
      height: 3px;
      box-sizing: border-box;
      font-size: 0;
      content: '';
      overflow: hidden;
      padding: 0;
    }
  }

  .ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    position: relative;

    &::after {
      background: #f56c6c;
    }
  }

  li.ghost {
    height: 5px;
    list-style: none;
    font-size: 0;
    overflow: hidden;
  }

  .widget-grid {
    background: #f4f6fc;
    position: relative;
    border-left: 5px solid transparent;
    padding: 5px;
    margin: 0 !important;

    &.active {
      border-left: 5px solid var(--primary-color);
      background: #b3d8ff;
    }
  }

  .widget-grid-container {
    &.ghost {
      background: #f56c6c;
      border: 2px solid #f56c6c;
      outline-width: 0;
      height: 3px;
      box-sizing: border-box;
      font-size: 0;
      content: '';
      overflow: hidden;
      padding: 0;
    }
  }

  .ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    position: relative;

    &::after {
      background: #f56c6c;
    }
  }

  li.ghost {
    height: 5px;
    list-style: none;
    font-size: 0;
    overflow: hidden;
  }
}
</style>
