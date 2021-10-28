<?php
/**
 * @package TutorLMS/Templates
 * @version 1.5.8
 */

?>

<div class="tutor-course-listing-item-head tutor-bs-d-flex">
	<?php
	tutor_course_loop_thumbnail();

	$course_id = get_the_ID();
	?>
    <?php
        $is_wishlisted = tutor_utils()->is_wishlisted($course_id);
        $has_wish_list = '';
        if ($is_wishlisted){
	        $has_wish_list = 'has-wish-listed';
        }

        $action_class = '';
        if ( is_user_logged_in()){
            $action_class = apply_filters('tutor_wishlist_btn_class', 'tutor-course-wishlist-btn');
        }else{
            $action_class = apply_filters('tutor_popup_login_class', 'cart-required-login');
        }

		//echo '<button className="save-bookmark-btn tutor-bs-d-flex tutor-bs-align-items-center tutor-bs-justify-content-center"><span className="ttr-fav-line-filled">'.get_tutor_course_level().'</span></button>';
		echo '<button class="save-bookmark-btn tutor-bs-d-flex tutor-bs-align-items-center tutor-bs-justify-content-center"><span class="ttr-fav-line-filled"><a href="javascript:;" class="'.$action_class.' '.$has_wish_list.' " data-course-id="'.$course_id.'"></a> </span></button>';
		?>
</div>