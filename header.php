<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ReminiscentDesign
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link href="https://fonts.googleapis.com/css?family=Comfortaa:700|Sree+Krushnadevaraya" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700" rel="stylesheet">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'ReminiscentDesign' ); ?></a>

	<header>
		<div class="nav-container">
	      <nav>
	        <span id="active-link" class="nav-link left-link"><a href="/">Home</a></span>
	        <span class="nav-link left-link"><a href="/about">About</a></span>
	        <span class="nav-link right-link"><a href="/work">Work</a></span>
	        <span class="nav-link right-link"><a href="/contact">Contact</a></span>
	      </nav>
	    </div>
	</header><!-- #masthead -->

	<!-- <div id="content" class="site-content"> -->
	<main class="layout-main">
