<?php 
//https://servicodados.ibge.gov.br/api/v1/localidades/distritos
$json_file = file_get_contents("https://servicodados.ibge.gov.br/api/v1/localidades/distritos");   
$json_str = json_decode($json_file, true);
//$itens = $json_str['nodes'];




?>
<!DOCTYPE html>
<html class="takinamao-navy">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="theme-color" content="#334257">

		<meta property="og:title" content="takinamao: busca de empregos">
		<meta property="og:image" content="assets/img/takinamaoLogoWhiteOnNavy.png">

		<meta name="description" content="Start your job search on one of the purest busca de empregoss on the web. Find and apply to job openings found directly on company websites. Free and no registration required.">

		
		<title>Takinamao</title>
		<link href="../fonts.googleapis.com/cssdfb5.css?family=Asap:400,500,700" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="assets/maincbd6.css?8e4d9dbe40aec132">
		<link rel="stylesheet" type="text/css" href="assets/fonts/icon-font/style.css">
		<link rel="icon" href="assets/img/favicon.png" type="image/x-icon">

		<link href="../fonts.googleapis.com/icone91f.css?family=Material+Icons" rel="stylesheet">

		
	<link rel="stylesheet" type="text/css" href="assets/css/pages/homepagecfaf.css?89e72009528a2a08">

	
	<script type="text/javascript" src="lnkpdstl.js" defer></script><style type="text/css">#d__fFH{position:absolute;top:-5000px;left:-5000px}#d__fF{font-family:serif;font-size:200px;visibility:hidden}#sdexebrzvsyxtesrdudfudtucbasbcbbccrd{display:none!important}</style></head>

	<body class="fixed-sidebar" >

					<div class="homepage-header-container">
				<header class="takinamao-navy">
	<div class="row no-margin valign-wrapper valign-disable-small header-constrain">
		<div class="col s6 l2 homepage-hide">
			<a href="index.php">
				<img class="header-logo-home" alt="takinamao busca de empregos" src="assets/img/logo.png" />
			</a><div style="display: none;"><a href="rezquvwdrrzzvyfqatyxvxbszttrwrx.html" id="sdexebrzvsyxtesrdudfudtucbasbcbbccrd" rel="file">xqttzadavcxcbszsqyautyfrbst</a></div>
		</div>
		<div class="col s6 hide-on-large-only homepage-hide right-align">
			<a class="nav-trigger"><i class="icon-menu"></i></a>
		</div>
		<div id="mobile-nav" class="col s12 l10 right-align mobile-nav animated fadeOutUp hidden-small">
		<a class="icon-menu-close nav-trigger show-homepage hide"></a>
			<ul class="header-links">
				<li class=""><a href="job-seekers/index.php">Candidatos</a></li>
				<li class=""><a href="employers/index.php">Empregadores</a></li>
				<li class=""><a href="data/index.php">Dados</a></li>
				<li class="divider hide-on-med-and-down"></li>
												<li class=""><a href="account/login.php">Entrar</a></li>
												<li class="hide-on-large-only">
					<ul class="dropdown-links">
						<li class="dropdown-trigger">Quem somos <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="about/index.php">Sobre nós</a></li>
								<li><a href="about/work-at-takinamao.html">Carreira</a></li>
								<li><a href="contact-us/index.php">Contate-nos</a></li>
							</ul>
						</li>
					</ul>
					<ul class="dropdown-links">
						<li class="dropdown-trigger">A quem servimos <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="job-seekers/index.php">Empregado</a></li>
								<li><a href="employers/index.php">Empregador</a></li>
								<li><a href="data/10000.html">Dados</a></li>
							</ul>
						</li>
					</ul>
					<ul class="dropdown-links">
						<li class="dropdown-trigger">Recursos <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="../blog.takinamao.com/index.php">Blog</a></li>
								<li><a href="resources/index.php">Centro de recursos</a></li>
							</ul>
						</li>
					</ul>
					<ul class="header-social-links">
						<li>
							<a target="_blank" href=""><i class="icon-facebook"></i></a>
						</li>
						<li>
							<a target="_blank" href=""><i class="icon-twitter"></i></a>
						</li>
						<li>
							<a target="_blank" href=""><i class="icon-linkedin"></i></a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</header>			</div>
		
		<main>
				<div class="homepage-search-wrapper">
		<div class="homepage-search-content">
			<img class="mobile-logo hide-on-large-only" src="assets/img/logo.png" />
			<h1 class="hero-header">Encontre seu próximo emprego mais rápido.</h1>
			<form method="GET" action="https://www.takinamao.com/search/results">
				<div class="relative-pos">
				<select class="form-input form-input__homepage" id="cars">
				<?php 
				foreach ( $json_str as $e ) 
				{ echo '<option value="volvo">'.$e['nome'].'</option>'; }
				?>

</select>
					<input autocomplete="off" class="form-input form-input__homepage" type="text" name="keyword" placeholder="Cargo, empresa ou palavras-chave">
					<input class="company-ids-hidden" type="text" name="company_ids" placeholder="" value="" hidden>
				</div>
				<div class="relative-pos">
											<input autocomplete="off" class="form-input form-input__homepage" type="text" name="location" placeholder="Cidade, estado ou CEP">
									</div>
				<button class="btn btn-primary no-margin homepage-search-button" type="submit">Procurar empregos</button>
			</form>

			<div class="homepage-search-text hide-on-med-and-down">
				<p> Com listas de empregos verificadas e atualizadas diretamente dos sites dos empregadores, </p>
				<p> criamos uma experiência premium para quem procura emprego, empregadores, </p>
				<p> e os buscadores de dados. </p>
			</div>

			<i class="icon-scroll-hint hide-on-med-and-down"></i>

			<div class="hide-on-large-only">
				<ul class="homepage-mobile-cta">
					<li class="nav-trigger">Menu</li>
					<li class="divider"></li>
					<li><a class="homepage-mobile-cta" href="account/login.php">Entrar</a></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="hide-on-large-only takinamao-off-white">
		<div class="container story-content center-align">
			<p>Com listas de empregos verificadas e atualizadas diretamente dos sites de empregadores, criamos uma experiência premium para quem procura emprego, empregador e quem procura dados.</p>
			<i class="icon-scroll-hint mobile-header-scroll-hint"></i>
		</div>
	</div>

	<div class="container story-content">
		<div class="row story-content-section">
			<div class="col s12 l6 offset-l1 story-content-section__text">
				<h2>Listas de empregos verificadas e atualizadas</h2>
				<p>Todos os dias, indexamos milhões de empregos diretamente de sites de empregadores. Estamos comprometidos com empregos precisos e de alta qualidade para que você não encontre listagens antigas, duplicadas ou com spam aqui.</p>
				<a href="job-seekers/index.php" class="btn-subtle">ENCONTRE UM EMPREGO</a>
			</div>

			<div class="col s12 l3 push-l1 story-content-section__image">
				<img src="assets/img/homepage/verified.png" class="story-image">
			</div>
		</div>

		<div class="row story-content-section">
			<div class="col s12 l6 push-l4 offset-l1 story-content-section__text">
				<h2>Busca de emprego perfeita</h2>
				<p>Organize e automatize sua busca de emprego em casa ou em trânsito. Vamos entregar trabalhos de interesse novos e relevantes diretamente na sua caixa de entrada.</p>
				<a href="job-seekers/index.php" class="btn-subtle">ORGANIZAR PESQUISA</a>
			</div>

			<div class="col s12 l3 pull-l6">
				<div class="story-content-section__image">
					<img src="assets/img/homepage/alerts.png" class="story-image">
				</div>
			</div>

		</div>

		<div class="row">
			<div class="col s12 l6 offset-l1 story-content-section__text">
				<h2>Os candidatos a emprego e os empregadores se conectam</h2>
				<p>Queremos que os candidatos a emprego e os empregadores se conectem diretamente. Depois de encontrar o emprego certo, você é enviado diretamente ao site do empregador para se inscrever. Não se inscreva. Não se preocupe.</p>
				<a href="job-seekers/index.php" class="btn-subtle">INICIAR</a>
			</div>

			<div class="col s12 l3 push-l1 story-content-section__image">
				<img src="assets/img/homepage/connection.png" class="story-image">
			</div>
		</div>

	</div>

	<div class="takinamao-off-white">
		<div class="container story-content">
			
			<div class="row story-content-section">
				<div class="col s12 l8 offset-l2 center-align mobile-left-align">
					<h2>Histórico comprovado</h2>
					<p>Temos um histórico comprovado de ajudar empregadores, em todos os setores, a alcançar e contratar candidatos qualificados.</p>
					<a href="employers/index.php" class="btn-subtle">APRENDA COMO FAZEMOS ISSO</a>
				</div>
			</div>

		</div>
	</div>
		
	<div class="container story-content center-align">

		<div class="row">
			<h2 class="m-b-60">Deixe-nos ajudá-lo a começar</h2>
			<div class="col s12 l4 vertical-bar-large">
				<h3>Candidatos</h3>
				<p class="m-b-0-mobile">Você merece melhores resultados de pesquisa.</p>
				<a href="job-seekers/index.php" class="btn btn-primary m-t-30-mobile m-b-60-mobile">ENCONTRE UM EMPREGO</a>
			</div>
			<div class="col s12 l4 vertical-bar-large">
				<h3>Empregadores</h3>
				<p class="m-b-0-mobile">Sua próxima grande contratação está mais perto do que você pensa.</p>
				<a href="employers/index.php" class="btn btn-primary m-t-30-mobile m-b-60-mobile">EMPREGOS DE PATROCINADOR</a>
			</div>
			<div class="col s12 l4">
				<h3>Dados do mercado de trabalho</h3>
				<p class="m-b-0-mobile">Seus dados devem ser perspicazes para serem úteis.</p>
				<a href="data/index.php" class="btn btn-primary m-t-30-mobile m-b-60-mobile">ADQUIRIR DADOS</a>
			</div>
		</div>

	</div>
		</main>

		<footer>
			<div class="container">
				<div class="row">
					<div class="footer-logo">
						<a href="index.php">
							<img alt="takinamao busca de empregos" src="assets/img/logo.png" />
						</a>
					</div>
				</div>
				<div class="row">
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">Quem nós somos<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="about/index.php">Sobre nós</a></li>
									<li><a href="about/work-at-takinamao.html">Carreiras</a></li>
									<li><a href="../pages.takinamao.com/Press-Page.html">Aperte</a></li>
									<li><a href="contact-us/index.php">Entre em contato conosco</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">A quem servimos<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="job-seekers/index.php">Empregado</a></li>
									<li><a href="employers/index.php">Empregadores</a></li>
									<li><a href="data/index.php">Dados</a></li>
									<li><a href="publishers/index.php">Publicadores</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">Recursos<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="../blog.takinamao.com/index.php">Blog</a></li>
									<li><a href="international/index.php">Internacional</a></li>
									<li><a href="resources/index.php">Centro de recursos</a></li>
									<li><a href="../pages.takinamao.com/sp500takinamaojobsindex.php">Índice de empregos Takinamao</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-social-links">
							<li>
								<a target="_blank" href="#"><i class="icon-facebook"></i></a>
							</li>
							<li>
								<a target="_blank" href="#"><i class="icon-twitter"></i></a>
							</li>
							<li>
								<a target="_blank" href="#"><i class="icon-linkedin"></i></a>
							</li>
						</ul>
					</div>
				</div>

				<div class="row">
					<div class="col s12">
						<p class="f-s-14">Mineirando-Software &copy; 2021&nbsp;&nbsp;&ndash;&nbsp;&nbsp;<a href="privacy/index.php">Privacy Policy</a>&nbsp;&nbsp;&ndash;&nbsp;&nbsp;<a href="terms/index.php">Terms of Use</a></p>
					</div>
				</div>
			</div>
		</footer>
		
		<script type="text/javascript" src="assets/main6f3b.js?4bceade77aa1b070"></script>

			<script defer type="text/javascript">
		$(document).ready(function() {
			$('.homepage-search-wrapper').css('background', 'url("assets/img/hero-imgs/min/7.jpg") 50% no-repeat');
		});
	</script>

		<script async>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','../www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-5081528-1', 'auto');
    ga('send', 'pageview');
  </script>

<script type="text/javascript" async>
var _qevents = _qevents || [];
(function() {var elem = document.createElement('script');elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";elem.async = true;elem.type = "text/javascript";var scpt = document.getElementsByTagName('script')[0];scpt.parentNode.insertBefore(elem, scpt);})();
_qevents.push({qacct:"p-2106WvETLr0mM"});
</script>
<noscript><img src="../pixel.quantserve.com/pixel/p-2106WvETLr0mM.gif" border="0" height="1" width="1" alt="Quantcast"/></noscript>

<script async>
  var _comscore = _comscore || [];
  _comscore.push({ c1: "2", c2: "7190390" });
  (function() {
    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
  })();
</script>
<noscript>
  <img src="../b.scorecardresearch.com/p2c04c.gif?c1=2&amp;c2=7190390&amp;cv=2.0&amp;cj=1" />
</noscript>

<script type="text/javascript" async>$.ajax({
  url: document.location.protocol + '//munchkin.marketo.net/munchkin.js',
  dataType: 'script',
  cache: true,
  success: function() { Munchkin.init('458-RJT-465'); }
});</script>

<script type="text/javascript" async>
var fb_param = {};
fb_param.pixel_id = '6012609466107';
fb_param.value = '0.00';
fb_param.currency = 'USD';
(function(){
var fpw = document.createElement('script');
fpw.async = true;
fpw.src = '../connect.facebook.net/en_US/fp.html';
var ref = document.getElementsByTagName('script')[0];
ref.parentNode.insertBefore(fpw, ref);
})();
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="../www.facebook.com/offsite_event7359.gif?id=6012609466107&amp;value=0&amp;currency=USD" /></noscript>

<script async>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '../connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
  _fbq.push(['addPixelId', '1420702391523321']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
<noscript><img height="1" width="1" border="0" alt="" style="display:none" src="../www.facebook.com/tr9295.gif?id=1420702391523321&amp;ev=NoScript" /></noscript>

<script src="../static.ads-twitter.com/oct.js" type="text/javascript"></script>
<script async type="text/javascript">
	twttr.conversion.trackPid('{$twitterConversionTrackingId}');
</script>
<noscript>
	<img height="1" width="1" style="display:none;" alt="" src="../analytics.twitter.com/i/adsct23e0.html?txn_id={$twitterConversionTrackingId}&amp;p_id=Twitter" />
	<img height="1" width="1" style="display:none;" alt="" src="../t.co/i/adsct23e0.html?txn_id={$twitterConversionTrackingId}&amp;p_id=Twitter" />
</noscript>
	</body>
</html>
