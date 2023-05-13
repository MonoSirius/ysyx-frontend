<template>
  <container w1280 flex-column flex-start flex-grow content-h-fill content-left>
    <container round content-left margin-v next-level>
      <a-typography>
        <a-typography-title>{{ postTitle }}</a-typography-title>
        <a-typography-paragraph>
          第六期训练营即将开课！！！！
          <a-typography-text strong> 请同学们积极参加！ </a-typography-text>
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ul>
            <li>
              课时: 每周六19:00~21:00
              <ul>
                <li>
                  <a-typography-link href="/docs/resources"
                    >直播链接</a-typography-link
                  >
                </li>
              </ul>
            </li>

            <li>答疑: 每周日19:00~20:00 (通过预学习答辩后由助教通知)</li>
          </ul>
        </a-typography-paragraph>

        <a-typography-title :level="2">课程导学</a-typography-title>
        <a-typography-paragraph>
          本课程吧啦吧啦啦。。。。
        </a-typography-paragraph>

        <a-typography-paragraph>
          <ul>
            <li>
              <a-typography-link href="/docs/resources"
                >资源下载</a-typography-link
              >
            </li>
          </ul>
        </a-typography-paragraph>

        <a-divider />
      </a-typography>
    </container>
  </container>
</template>

<script setup>
let blockContent = "dsdsdsd";
let postTitle = "关于第六期“一生一芯”训练营开课通知";
</script>
