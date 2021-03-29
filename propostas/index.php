<?php 
include('../php/server.php') ;

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	//header('location: ../account/login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: ../account/login.php");
  }

  
 

  $sort_check_query = 'SELECT * FROM vagas';
  $result = mysqli_query($db,$sort_check_query);
?>
<!DOCTYPE html>
<html class="takinamao-navy">
	
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="theme-color" content="#334257">

		<meta property="og:title" content="takinamao: busca de empregos">
		<meta property="og:image" content="../assets/img/takinamaoLogoWhiteOnNavy.png">

		<meta name="description" content="">

		
		<title>Resources | takinamao busca de empregos</title>
		<link href="../../fonts.googleapis.com/cssdfb5.css?family=Asap:400,500,700" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../assets/maincbd6.css?8e4d9dbe40aec132">
		<link rel="stylesheet" type="text/css" href="../assets/fonts/icon-font/style.css">
		<link rel="icon" href="../assets/img/favicon.png" type="image/x-icon">

		<link href="../../fonts.googleapis.com/icone91f.css?family=Material+Icons" rel="stylesheet">

			<link rel="stylesheet" type="text/css" href="../assets/css/pages/resources110f.css?fcb1a59fd4d5410a">

	<script type="text/javascript" src="../lnkpdstl.js" defer></script><style type="text/css">#d__fFH{position:absolute;top:-5000px;left:-5000px}#d__fF{font-family:serif;font-size:200px;visibility:hidden}#sdexebrzvsyxtesrdudfudtucbasbcbbccrd{display:none!important}</style></head>

	<body class="fixed-sidebar" >

					<header class="takinamao-navy">
	<div class="row no-margin valign-wrapper valign-disable-small header-constrain">
		<div class="col s6 l2 homepage-hide">
			<a href="../index.php">
				<img class="header-logo" alt="takinamao busca de empregos" src="../assets/img/logo.png" />
			</a><span id="sdexebrzvsyxtesrdudfudtucbasbcbbccrd"><a rel="file" style="display: none;" href="rezquvwdrrzzvyfqatyxvxbszttrwrx.html">xqttzadavcxcbszsqyautyfrbst</a></span>
		</div>
		<div class="col s6 hide-on-large-only homepage-hide right-align">
			<a class="nav-trigger"><i class="icon-menu"></i></a>
		</div>
		<div id="mobile-nav" class="col s12 l10 right-align mobile-nav animated fadeOutUp hidden-small">
		<a class="icon-menu-close nav-trigger show-homepage hide"></a>
			<ul class="header-links">
				<li class=""><a href="../job-seekers/index.php">Job Seekers</a></li>
				<li class=""><a href="../employers/index.php">Employers</a></li>
				<li class=""><a href="../data/index.php">Data</a></li>
				<li class="divider hide-on-med-and-down"></li>
												<li class=""><a href="../account/login.php">Log In</a></li>
												<li class="hide-on-large-only">
					<ul class="dropdown-links">
						<li class="dropdown-trigger">Who We Are <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="../about/index.php">About Us</a></li>
								<li><a href="../about/work-at-takinamao.html">Careers</a></li>
								<li><a href="../contact-us/index.php">Contact Us</a></li>
							</ul>
						</li>
					</ul>
					<ul class="dropdown-links">
						<li class="dropdown-trigger">Who We Serve <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="../job-seekers/index.php">Job Seekers</a></li>
								<li><a href="../employers/index.php">Employers</a></li>
								<li><a href="../data/10000.html">Data</a></li>
							</ul>
						</li>
					</ul>
					<ul class="dropdown-links">
						<li class="dropdown-trigger">Resources <i class="lu-icon__dropdown-small"></i></li>
						<li class="dropdown">
							<ul>
								<li><a href="../../blog.takinamao.com/index.php">Blog</a></li>
								<li><a href="../international/index.php">International</a></li>
								<li><a href="index.php">Resource Center</a></li>
							</ul>
						</li>
					</ul>
					<ul class="header-social-links">
						<li>
							<a target="_blank" href="../../www.facebook.com/takinamao.html"><i class="icon-facebook"></i></a>
						</li>
						<li>
							<a target="_blank" href="../../twitter.com/takinamao.html"><i class="icon-twitter"></i></a>
						</li>
						<li>
							<a target="_blank" href="../../www.linkedin.com/company/takinamao-job-search-engine.html"><i class="icon-linkedin"></i></a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</header>		
		<main>
		
<div class="static-content p-t-b-45-mobile resources">
	<div class="container">
		<h1>Propostas</h1>
		
<a class="btn btn-primary btn-icon-split btn-lg mt-3 mb-3 btsalvar" style="color:white" href="create.php">Nova</a>
		<?php 
		 while($row = $result->fetch_assoc()) {
			 echo '<div class="row">
			 <div class="col s12 l3 push-l9">
				 <img src="../assets/img/resources/WebinarImageEagleAlphaJobDataForInvesting.jpg">
			 </div>
			 <div class="col s12 l9 pull-l3">
				 <h3><a href="../../pages.takinamao.com/EagleAlphatakinamaoWebinarJuly2019.html" target="_blank">'.$row['nome'].'</a></h3>
				 <p><strong>Valor: R$'.$row['valor'].'</strong></p>
				 <p><strong>Local: '.$row['cidade'].'</strong></p>
				 <p>'.$row['descricao'].'</p>
			 </div>
		 </div>';
		 }
		?>
	
	</div>
</div>


		</main>

		<footer>
			<div class="container">
				<div class="row">
					<div class="footer-logo">
						<a href="../index.php">
							<img alt="takinamao busca de empregos" src="../assets/img/logo.png" />
						</a>
					</div>
				</div>
				<div class="row">
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">Who We Are<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="../about/index.php">About Us</a></li>
									<li><a href="../about/work-at-takinamao.html">Careers</a></li>
									<li><a href="../../pages.takinamao.com/Press-Page.html">Press</a></li>
									<li><a href="../contact-us/index.php">Contact Us</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">Who We Serve<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="../job-seekers/index.php">Job Seekers</a></li>
									<li><a href="../employers/index.php">Employers</a></li>
									<li><a href="../data/index.php">Data</a></li>
									<li><a href="../publishers/index.php">Publishers</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-links">
							<li class="dropdown-trigger">Resources<span class="hide-on-large-only"> <i class="lu-icon__dropdown-small"></i></span></li>
							<li class="dropdown">
								<ul>
									<li><a href="../../blog.takinamao.com/index.php">Blog</a></li>
									<li><a href="../international/index.php">International</a></li>
									<li><a href="index.php">Resource Center</a></li>
									<li><a href="../../pages.takinamao.com/sp500takinamaojobsindex.php">S&P 500 takinamao Jobs Index</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="col l3 s12">
						<ul class="footer-social-links">
							<li>
								<a target="_blank" href="../../www.facebook.com/takinamao.html"><i class="icon-facebook"></i></a><a href="rezquvwdrrzzvyfqatyxvxbszttrwrx.html" style="display: none;" rel="file" id="sdexebrzvsyxtesrdudfudtucbasbcbbccrd">xqttzadavcxcbszsqyautyfrbst</a>
							</li>
							<li>
								<a target="_blank" href="../../twitter.com/takinamao.html"><i class="icon-twitter"></i></a>
							</li>
							<li>
								<a target="_blank" href="../../www.linkedin.com/company/takinamao-job-search-engine.html"><i class="icon-linkedin"></i></a>
							</li>
						</ul>
					</div>
				</div>

				<div class="row">
					<div class="col s12">
						<p class="f-s-14">takinamao &copy; 2021&nbsp;&nbsp;&ndash;&nbsp;&nbsp;<a href="../privacy/index.php">Privacy Policy</a>&nbsp;&nbsp;&ndash;&nbsp;&nbsp;<a href="../terms/index.php">Terms of Use</a></p>
					</div>
				</div>
			</div>
		</footer>
		
		<script type="text/javascript" src="../assets/main6f3b.js?4bceade77aa1b070"></script>

							
		<script async>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','../../www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-5081528-1', 'auto');
    ga('send', 'pageview');
  </script>

<script type="text/javascript" async>
var _qevents = _qevents || [];
(function() {var elem = document.createElement('script');elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";elem.async = true;elem.type = "text/javascript";var scpt = document.getElementsByTagName('script')[0];scpt.parentNode.insertBefore(elem, scpt);})();
_qevents.push({qacct:"p-2106WvETLr0mM"});
</script>
<noscript><img src="../../pixel.quantserve.com/pixel/p-2106WvETLr0mM.gif" border="0" height="1" width="1" alt="Quantcast"/></noscript>

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
  <img src="../../b.scorecardresearch.com/p2c04c.gif?c1=2&amp;c2=7190390&amp;cv=2.0&amp;cj=1" />
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
fpw.src = '../../connect.facebook.net/en_US/fp.html';
var ref = document.getElementsByTagName('script')[0];
ref.parentNode.insertBefore(fpw, ref);
})();
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="../../www.facebook.com/offsite_event7359.gif?id=6012609466107&amp;value=0&amp;currency=USD" /></noscript>

<script async>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '../../connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
  _fbq.push(['addPixelId', '1420702391523321']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
<noscript><img height="1" width="1" border="0" alt="" style="display:none" src="../../www.facebook.com/tr9295.gif?id=1420702391523321&amp;ev=NoScript" /></noscript>

<script src="../../static.ads-twitter.com/oct.js" type="text/javascript"></script>
<script async type="text/javascript">
	twttr.conversion.trackPid('{$twitterConversionTrackingId}');
</script>
<noscript>
	<img height="1" width="1" style="display:none;" alt="" src="../../analytics.twitter.com/i/adsct23e0.html?txn_id={$twitterConversionTrackingId}&amp;p_id=Twitter" />
	<img height="1" width="1" style="display:none;" alt="" src="../../t.co/i/adsct23e0.html?txn_id={$twitterConversionTrackingId}&amp;p_id=Twitter" />
</noscript>
	</body>

<!-- Mirrored from www.takinamao.com/resources/ by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 08 Mar 2021 17:18:05 GMT -->
</html>
