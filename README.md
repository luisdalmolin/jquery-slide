# jQuery Slide

jQuery plugin for create sliders.

### Instalation

Available via [bower](http://bower.io/).

```bash
$ bower install jquery-slide --save
```

### Usage

```html
<div class="slide-fixo">
    <a href="#" style="background-image: url(/images/img-1.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-2.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-3.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-4.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-5.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-6.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-7.jpg)" class="slide-item"></a>
    <a href="#" style="background-image: url(/images/img-8.jpg)" class="slide-item"></a>
</div>

<script type="text/javascript">
(function() {
    $('.slide-fixo').slide();
})();
</script>
```

### License

[MIT License](http://luisdalmolin.mit-license.org/) © Luis Dalmolin