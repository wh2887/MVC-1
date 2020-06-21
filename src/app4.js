import './app4.css'
import $ from 'jquery'

const html = `
    <section class="app4">
        <div class="circle"></div>
    </section>
`
const $element = $(html).appendTo($('body>.page'))

const $circle = $('.app4 .circle')
$circle.on('mouseenter', () => [
  $circle.addClass('active')
]).on('mouseleave', () => {
  $circle.removeClass('active')
})

