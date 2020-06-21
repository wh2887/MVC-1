import './app2.css'
import $ from 'jquery'

const eventBus = $(window)

// 数据相关都放到 M
const localKey = 'app2.index'
const m = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  },
  get() {}
}


const v = {
  el: null,
  html: (index) => {
    return `
    <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1</span></li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1">2</li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}">内容1</li>
            <li class="${index === 1 ? 'active' : ''}">内容2</li>
        </ol>
    </div>
`
  },
  init(container) {
    v.el = $(container)
  },
  render(index) {
    if (v.el.children.length === 0) {
    } else {
      v.el.empty()
    }
    $(v.html(index)).appendTo(v.el)
  }
}


const c = {
  //初始化 ui
  init(container) {
    v.init(container)
    v.render(m.data.index) //第一次 view = render（data）
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'x',
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({index:index})
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      v.el.on(part1, part2, value)
    }
  },
}

export default c


// const $tabBar = $('.app2 .tab-bar')
// const $tabContent = $('.app2 .tab-content')
// $tabBar.on('click', 'li', e => {
//   const $li = $(e.currentTarget)
//   $li.addClass('selected')
//     .siblings().removeClass('selected')
//   const index = $li.index()
//   localStorage.setItem(localKey, index)
//   // 样式与行为分离
//   $tabContent.children().eq(index).addClass('active')
//     .siblings().removeClass('active')
// })
// // 默认哪个被选中
// $tabBar.children().eq(index).trigger('click')