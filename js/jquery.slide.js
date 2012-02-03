/**
 * Plugin pra criação de slide
 *
 * @author Luis Dalmolin
 * @luisdalmolin
 *
 * @version 1.1
 * @created at 04/2011
 */
 
(function($) {
	$.fn.slide = function(options)
	{
		var defaults = {
			$pai          : null, 
			$fixo         : $('#slide-fixo'), 
			$runner       : $('#slide-runner'), 
			$setaEsquerda : $('#seta-esquerda'), 
			$setaDireita  : $('#seta-direita'), 
			
			$item         : $('.item-slide'), 
			totalItens    : 0, 
			
			ajuste        : -20, 
			tamanhoBox    : 0,
			margemBox     : 0, 
			left          : 0, 

			tempo         : 8 
		}
		
		var opt  = $.extend( defaults, options );
		opt.$pai = $(this);

		
		/**
		 * Pegando tamanhos iniciais
		 */
		opt.totalItens = opt.$item.size();
		opt.tempo      = opt.totalItens * opt.tempo;
		
		var tamanhoTotal = 0;
		opt.$item.each(function() {
			tamanhoTotal += ( parseInt( $(this).width() ) + parseInt( $(this).css('margin-left').replace('px', '') ) + parseInt( $(this).css('margin-right').replace('px', '') ) );
		})
		opt.$runner.width( tamanhoTotal );
		
		if( opt.left == 0 ) {
			opt.left = ( opt.$runner.width() - opt.$pai.width() );
		}
		opt.tempo = opt.tempo * opt.totalItens;	

		
		/**
		 * Hover nas setas
		 */
		opt.$setaDireita.hover(
			function() {
				
				opt.$runner.animate({
					'margin-left' : - opt.left + 'px'
				}, opt.tempoRestante('direita') , 'linear');
			}, function() {
				opt.$runner.stop();
			}
		);
			
		opt.$setaEsquerda.hover(
			function() {
				opt.$runner.animate({
					'margin-left' : '20px'
				}, opt.tempoRestante('esquerda') , 'linear');
			}, function() {
				opt.$runner.stop();
			}
			
		);
		
		opt.tempoRestante = function(orientacao) {
			var 
				leftTotal	 = parseInt(opt.left), 
				leftRestante = parseInt( opt.$runner.css('margin-left').replace('px', '') ), 
				tempo        = parseInt(opt.tempo);
			
			/**
			 * Transforma restante pra positivo
			 */	
			leftRestante *= leftRestante < 0 ? -1 : 1;
			leftRestante  = orientacao == 'direita' ? ( leftTotal - leftRestante ) : leftRestante;
			
			return ( leftRestante * tempo ) / leftTotal;
		}
	}
})(jQuery);