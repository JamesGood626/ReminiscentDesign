<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ReminiscentDesign
 */

get_header();
?>

	<main id="barba-wrapper" class="layout-main">
		<div class="heading-container barba-container">
			<h1 style="color: red;">PAGEEEEEEEEEEEEEEEEEEEEE</h1>
		</div>
	</main>
<?php
get_footer();
?>

<div id="primary" class="content-area">
		<main id="main" class="site-main">


		<!-- This is the cause of the lingering edit -->
		<!--
		php begin
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		php end-->

		<!--</main>--><!-- #main -->
	<!--</div>--><!-- #primary -->


<!--get_sidebar();-->
