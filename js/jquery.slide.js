/*
 *  Project: jQuery Slide
 *  Description: Plugin JS para criar um slide simples de varias imagens
 *  Author: Luís Dalmolin <luis.nh@gmail.com> 
 *  License: MIT 
 *  Version: 1.3
 */ 

// Utility
if( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}


;(function ( $, window, undefined ) {
    // Plugin
    var Slide = {
        // init do plugin 
        init : function( options, element ) {
            var self     = this;

            self.element = element;
            self.options = $.extend( {}, $.fn.slide.options, options );

            self.fetchElements();
            self.getSizes();
            self.initNavigation();

            // calculando o tempo 
            self.options.speed = self.options.speed * self.options.totalItens;
        }, 

        fetchElements : function() {
            var self = this;

            // fixo 
            self.options.$fixo = $( self.element );
            if( self.options.type == 'vertical' ) {
                self.options.size  = self.options.$fixo.height();
            } else {
                self.options.size  = self.options.$fixo.width();
            }

            // itens 
            self.options.$item      = self.options.$fixo.find( self.options.$item );
            self.options.totalItens = parseInt( self.options.$item.size() );

            // classes adicionais 
            self.options.$fixo.addClass('slide-' + self.options.type);

            // criando os elementos 
            self.createElements();
        }, 

        createElements : function() {
            var self = this;

            self.options.$overflow = $('<div class="'+self.options.$overflow+'"></div>');
            self.options.$overflow.appendTo( self.options.$fixo );

            self.options.$runner = $('<div class="'+self.options.$runner+'"></div>');
            self.options.$runner.appendTo( self.options.$overflow );
            self.options.$item.appendTo( self.options.$runner );

            self.options.$navLeft = $('<a class="'+self.options.$navLeft+' '+self.options.classe.endNavigation+'"></a>');
            self.options.$navLeft.appendTo( self.options.$fixo );
            self.options.$navLeft.addClass( );

            self.options.$navRight = $('<a class="'+self.options.$navRight+'"></a>');
            self.options.$navRight.appendTo( self.options.$fixo );
        }, 

        getSizes : function() {
            var self = this;

            if( self.options.sizeTotal === null ) 
            {
                self.options.sizeTypes.type   = self.options.type == 'horizontal' ? 'width' : 'height';
                self.options.sizeTypes.nav    = self.options.type == 'horizontal' ? 'left' : 'top';
                self.options.sizeTypes.margin = self.options.type == 'horizontal' ? self.options.margin.horizontal : self.options.margin.vertical;

                if( self.options.defaultSizes ) 
                {
                    var size   = parseInt( self.options.$item.slice(0, 1).css( self.options.sizeTypes.type ).replace('px', '') ), 
                        margin = parseInt( self.options.$item.slice(0, 1).css( self.options.sizeTypes.margin ).replace('px', '') );

                    self.options.sizeTotal += ( self.options.totalItens * ( size + margin ) );

                    // verificando se o número de itens é impar, e precisa adicionar tamanhos para completar a linha
                    var itensLeft = self.options.$item.size() % self.options.columns;
                    if( itensLeft !== 0 ) 
                    {
                        self.options.sizeTotal += ( size + margin ) * ( self.options.columns - itensLeft );
                    }

                    // dividindo pelas colunas 
                    self.options.sizeTotal  = self.options.sizeTotal / self.options.columns;
                    self.options.sizeTotal += self.options.sizeTotalAjust;

                    // removendo a margem final 
                    if( self.options.removeLastMargin )
                    {
                        self.options.sizeTotal -= margin;
                    }
                } 
                else 
                {
                    var size   = 0, 
                        margin = 0;

                    self.options.$item.each(function() {
                        var $this = $this;

                        size   += parseInt( $this.slice(0, 1).css( self.options.sizeTypes.type ).replace('px', '') ), 
                        margin += parseInt( $this.slice(0, 1).css( self.options.sizeTypes.margin ).replace('px', '') );
                    });

                    self.options.sizeTotal = ( size + margin ) - self.options.size;
                    self.options.sizeTotal = self.options.sizeTotal / self.options.columns;
                }

                // removendo a ultima margem top ou bottom do ultimo elemento 
                if( self.options.removeLastMargin === true ) 
                {
                    self.options.$item
                    .slice( (self.options.totalItens - 1), self.options.totalItens )
                    .css(self.options.sizeTypes.margin, '0px');
                }
            }

            // tamanho do runner 
            if( self.options.sizeTypes.type == 'height' ) 
            {
                self.options.$runner.css({
                    'height' : self.options.sizeTotal + 'px'
                });
            } 
            else 
            {
                self.options.$runner.css({
                    'width' : self.options.sizeTotal + 'px'
                });
            }

            // escondendo as setas se necessario 
            if( self.options.sizeTotal < self.options.size ) {
                self.options.$navLeft.hide();
                self.options.$navRight.hide();
            }

            // descontando o tamanho do box 
            self.options.sizeTotal = self.options.sizeTotal - self.options.size;
        }, 

        initNavigation : function() {
            var self = this;

            // nav right ou top 
            if( self.options.type == 'horizontal' ) 
            {
                self.options.$navRight.on('mouseover', function() {
                    self.options.$runner.stop().animate({
                        'left' : '-' + self.options.sizeTotal + 'px'
                    }, self.timeLeft('right') );
                });
            } 
            else 
            {
                // adicionando a classe de top 
                self.options.$navRight.addClass('slide-nav-top');

                self.options.$navRight.on('mouseover', function() {
                    self.options.$runner.stop().animate({
                        'top' : '-' + self.options.sizeTotal + 'px'
                    }, self.timeLeft('right') );
                });
            }

            // mouse right leave 
            self.options.$navRight.on('mouseleave', function() {
                self.options.$runner.stop();

                self.addClassesEndNavigation('right');
            });

            // nav left, ou bottom 
            if( self.options.type == 'horizontal' ) {
                self.options.$navLeft.on('mouseover', function() {
                    self.options.$runner.stop().animate({
                        'left' : '0px'
                    }, self.timeLeft('left') );
                });
            } else {
                // adicionando a classe de top 
                self.options.$navLeft.addClass('slide-nav-bottom');

                self.options.$navLeft.on('mouseover', function() {
                    self.options.$runner.stop().animate({
                        'top' : '0px'
                    }, self.timeLeft('left') );
                });
            }

            // mouse left leave 
            self.options.$navLeft.on('mouseleave', function() {
                self.options.$runner.stop();

                self.addClassesEndNavigation('left');
            });
        }, 

        timeLeft : function( direction ) {
            var 
                self         = this, 
                leftTotal    = parseInt( self.options.sizeTotal ), 
                leftRestante = self.getWayLeft(), 
                tempo        = parseInt( self.options.speed );
            
            // transforma restante pra positivo 
            leftRestante *= leftRestante < 0 ? -1 : 1;
            leftRestante  = direction == 'right' ? ( leftTotal - leftRestante ) : leftRestante;
            
            return ( leftRestante * tempo ) / leftTotal;
        }, 

        getWayLeft : function() {
            var self = this;

            return parseInt( self.options.$runner.css( self.options.sizeTypes.nav ).replace('px', '') )
        }, 

        addClassesEndNavigation : function( direction ) {
            var self           = this, 
                leftPercorrido = self.getWayLeft();

            if( leftPercorrido < 0 ) {
                leftPercorrido = leftPercorrido * -1;
            }

            // right 
            if( direction == 'right' ) 
            {
                // remove do left 
                self.options.$navLeft.removeClass(  self.options.classe.endNavigation  );

                if( leftPercorrido >= self.options.sizeTotal ) {
                    self.options.$navRight.addClass( self.options.classe.endNavigation );
                } else {
                    self.options.$navRight.removeClass( self.options.classe.endNavigation );
                }
            } else {
                // remove do right 
                self.options.$navRight.removeClass( self.options.classe.endNavigation );
                
                if( leftPercorrido <= 0 ) {
                    self.options.$navLeft.addClass( self.options.classe.endNavigation );
                } else {
                    self.options.$navLeft.removeClass( self.options.classe.endNavigation );
                }
            }
        }, 

        removerElementos : function() {
            var self = this;

            self.options.$runner.remove();
            self.options.$overflow.remove();
            self.options.$navLeft.remove();
            self.options.$navRight.remove();
            self.options.$item.remove();

            self.options = $.fn.slide.options;
        }, 

        reset: function() {
            var self, itens, $fixo;

            self  = this;
            itens = self.options.$item;
            $fixo = self.options.$fixo;

            self.removerElementos();
            $fixo.html( itens );
        }
    }

    $.fn.slide = function( options ) {
        return this.each(function() {
            var slide = Object.create( Slide );
            
            slide.init( options, this );

            $.data( this, 'slide', slide );
        });
    };

    // defaults 
    $.fn.slide.options = {
        $fixo            : null, 
        $overflow        : 'slide-overflow', 
        $runner          : 'slide-runner', 
        $navLeft         : 'slide-nav-left', 
        $navRight        : 'slide-nav-right', 
        $item            : '.slide-item', 
        totalItens       : 0, 
        columns          : 1, 
        defaultSizes     : true, 
        removeLastMargin : true, 
        type           : 'horizontal', 
        sizeTypes      : {
            nav    : 'top', 
            type   : 'height', 
            margin : 'margin-bottom'
        }, 
        classe           : {
            'endNavigation' : 'slide-nav-end-navigation'
        }, 
        margin           : {
            vertical   : 'margin-bottom', 
            horizontal : 'margin-right'
        }, 
        size             : null, 
        sizeTotal        : null, 
        sizeTotalAjust   : 0, 
        speed            : 200
    }
}(jQuery, window));