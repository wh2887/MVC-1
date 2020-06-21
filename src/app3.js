import $ from 'jquery'
import './app3.css'
const  html = `
    <section class="app3">
        <div class="square">

        </div>
    </section>
`
const $element = $(html).appendTo($('body>.page'))

const  $square = $('.app3 .square')
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes'
if (active){
  $square.addClass('active')
}else {
  $square.removeClass('active')
}
// $square.toggleClass('active',active)
$square.on('click',()=>{
  //如果没有这个样式类，就加上，如果有就去掉这个样式
  // $square.toggleClass('active')
  if($square.hasClass('active')){
    $square.removeClass('active')
    localStorage.setItem(localKey,'no')
  }else {
    $square.addClass('active')
    localStorage.setItem(localKey,'yes')
  }
})
