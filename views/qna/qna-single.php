<?php
	extract( $data ); // $question_id

	// QNA data
	$question = tutor_utils()->get_qa_question( $question_id );
	$meta     = $question->meta;
	$answers  = tutor_utils()->get_qa_answer_by_question( $question_id );
	$back_url = isset( $back_url ) ? $back_url : remove_query_arg( 'question_id', tutor()->current_url );

	// Badges data
	$_user_id	   = get_current_user_id();
	$is_user_asker = $question->user_id == $_user_id;
	$id_slug 	   = $is_user_asker ? '_'.$_user_id : '';
	$is_solved     = (int) tutor_utils()->array_get( 'tutor_qna_solved'.$id_slug, $meta, 0 );
	$is_important  = (int) tutor_utils()->array_get( 'tutor_qna_important'.$id_slug, $meta, 0 );
	$is_archived   = (int) tutor_utils()->array_get( 'tutor_qna_archived'.$id_slug, $meta, 0 );
	$is_read       = (int) tutor_utils()->array_get( 'tutor_qna_read'.$id_slug, $meta, 0 );

	$modal_id     = 'tutor_qna_delete_single_' . $question_id;
	$reply_hidden = ! wp_doing_ajax() ? 'display:none;' : 0;

	// At first set this as read
	update_comment_meta( $question_id, 'tutor_qna_read'.$id_slug, 1 );
?>

<div class="tutor-qna-single-question" data-course_id="<?php echo $question->course_id; ?>" data-question_id="<?php echo $question_id; ?>" data-context="<?php echo $context; ?>">
	<!-- Delete modal -->
	<div id="<?php echo $modal_id; ?>" class="tutor-modal tutor-modal-is-close-inside-inner">
		<span class="tutor-modal-overlay"></span>
		<div class="tutor-modal-root">
			<div class="tutor-modal-inner">
				<button data-tutor-modal-close class="tutor-modal-close">
					<span class="tutor-icon-line-cross-line"></span>
				</button>
				<div class="tutor-modal-body tutor-text-center">
					<div class="tutor-modal-icon">
						<img src="<?php echo tutor()->url; ?>assets/images/icon-trash.svg" />
					</div>
					<div class="tutor-modal-text-wrap">
						<h3 class="tutor-modal-title">
							<?php esc_html_e( 'Delete This Question?', 'tutor' ); ?>
						</h3>
						<p>
							<?php esc_html_e( 'All the replies also will be deleted.', 'tutor' ); ?>
						</p>
					</div>
					<div class="tutor-modal-footer tutor-modal-btns tutor-btn-group">
						<button data-tutor-modal-close class="tutor-btn tutor-is-outline tutor-is-default">
							<?php esc_html_e( 'Cancel', 'tutor' ); ?>
						</button>
						<button class="tutor-btn tutor-list-ajax-action" data-request_data='{"question_id":<?php echo $question_id; ?>,"action":"tutor_delete_dashboard_question"}' data-redirect_to="<?php echo $back_url; ?>">
							<?php esc_html_e( 'Yes, Delete This', 'tutor' ); ?>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="tutor-qna-single-wrapper">

		<!-- Show header action bar if it is single question in backend/frontend dashboard -->
		<?php if ( in_array( $context, array( 'backend-dashboard-qna-single', 'frontend-dashboard-qna-single' ) ) ) : ?>
			<div class="tutor-qa-sticky-bar">
				<div class="tutor-color-text-primary back">
					<a class="tutor-back-btn" href="<?php echo $back_url; ?>">
						<span class="tutor-icon-previous-line tutor-color-design-dark"></span>
						<span class="text text tutro-text-regular-caption tutor-color-text-primary"><?php _e('Back', 'tutor'); ?></span>
					</a>
				</div>
				<div class="tutor-qna-badges tutor-qna-badges-wrapper tutor-bs-d-flex tutor-bs-align-items-center tutor-bs-justify-content-end">

					<!-- Show meta data actions if it is instructor view -->
					<?php if ( ! $is_user_asker ) : ?>
						<span data-action="solved" data-state-class-selector="i" data-state-class-0="tutor-icon-tick-circle-outline-filled" data-state-class-1="tutor-icon-mark-cricle tutor-text-success">
							<i class="<?php echo $is_solved ? 'tutor-icon-mark-cricle tutor-text-success active' : 'tutor-icon-tick-circle-outline-filled'; ?>"></i> 
							<span><?php _e( 'Solved', 'tutor' ); ?></span>
						</span>
						<span data-action="important" data-state-class-selector="i" data-state-class-0="tutor-icon-msg-important-filled" data-state-class-1="tutor-icon-msg-important-fill-filled">
							<i class="<?php echo $is_important ? 'tutor-icon-msg-important-fill-filled active' : 'tutor-icon-msg-important-filled'; ?>"></i> 
							<span><?php _e( 'Important', 'tutor' ); ?></span>
						</span>
						<span data-action="archived" data-state-text-selector="span" data-state-text-0="<?php _e( 'Archive', 'tutor' ); ?>" data-state-text-1="<?php _e( 'Un-Archive', 'tutor' ); ?>" data-state-class-selector="i" data-state-class-0="tutor-icon-msg-archive-filled" data-state-class-1="tutor-icon-msg-archive-filled">
							<i class="<?php echo $is_archived ? 'tutor-icon-msg-archive-filled active' : 'tutor-icon-msg-archive-filled'; ?>"></i> 
							<span><?php $is_archived ? _e( 'Un-Archive', 'tutor' ) : _e( 'Archive', 'tutor' ); ?></span>
						</span>
					<?php endif; ?>
					<span data-action="read" data-state-text-selector="span" data-state-text-0="<?php _e( 'Mark as read', 'tutor' ); ?>" data-state-text-1="<?php _e( 'Mark as Unread', 'tutor' ); ?>" data-state-class-selector="i" data-state-class-0="tutor-icon-msg-unread-filled" data-state-class-1="tutor-icon-msg-read-filled">
						<i class="<?php echo $is_read ? 'tutor-icon-msg-read-filled active' : 'tutor-icon-msg-unread-filled'; ?>"></i> 
						<span><?php $is_read ? _e( 'Mark as Unread', 'tutor' ) : _e( 'Mark as read', 'tutor' ); ?></span>
					</span>
					<span data-tutor-modal-target="<?php echo $modal_id; ?>">
						<i class="tutor-icon-delete-fill-filled"></i> 
						<span><?php _e( 'Delete', 'tutor' ); ?></span>
					</span>
				</div>
			</div>
		<?php endif; ?>

		<!-- Show  question anaswer. Both the root level question and reply will go in single loop. Just first one will be considered as root questoin. -->
		<div class="tutor-qa-chatlist">
			<?php
				$current_user_id = get_current_user_id();
				$avata_url       = array();
				$is_single       = in_array( $context, array( 'course-single-qna-sidebar', 'course-single-qna-single' ) );

			if ( is_array( $answers ) && count( $answers ) ) {
				$reply_count = count( $answers ) - 1;

				foreach ( $answers as $answer ) {
					if ( ! isset( $avata_url[ $answer->user_id ] ) ) {
						// Get avatar url if not already got
						$avata_url[ $answer->user_id ] = get_avatar_url( $answer->user_id );
					}

					$css_class = ( $current_user_id != $answer->user_id || $answer->comment_parent == 0 ) ? 'tutor-qna-left' : 'tutor-qna-right';
					$css_style = ( $is_single && $answer->comment_parent != 0 ) ? 'margin-left:14%;' . $reply_hidden : '';
					?>
						<div class="tutor-qna-chat <?php echo $css_class; ?> " style="<?php echo $css_style; ?>">
							<div class="tutor-qna-user">
								<img src="<?php echo get_avatar_url( $answer->user_id ); ?>" />
								<div>
									<div class="tutor-text-medium-h6 tutor-color-text-title">
										<?php echo $answer->display_name; ?>
									</div>
									<div class="tutor-text-regular-caption tutor-color-text-hints text-muted">
										<?php echo sprintf( __( '%s ago', 'tutor' ), human_time_diff( strtotime( $answer->comment_date ) ) ); ?>
									</div>
								</div>
							</div>

							<div class="tutor-qna-text tutor-text-regular-caption">
								<?php echo esc_textarea( stripslashes( $answer->comment_content ) ); ?>
							</div>

						<?php if ( $is_single && $answer->comment_parent == 0 ) : ?>
								<div class="tutor-toggle-reply">
									<span><?php _e( 'Reply', 'tutor' ); ?> <?php echo $reply_count ? '(' . $reply_count . ')' : ''; ?></span>
								</div>
							<?php endif; ?>
						</div>
						<?php
				}
			}
			?>
		</div>
		<div class="tutor-qa-reply tutor-mt-10 tutor-mb-5" data-context="<?php echo $context; ?>" style="<?php echo $is_single ? $reply_hidden : ''; ?>">
			<textarea class="tutor-form-control" placeholder="<?php _e( 'Write here...', 'tutor' ); ?>"></textarea>
			<div class="tutor-bs-d-flex tutor-bs-justify-content-end tutor-bs-align-items-center">
				<button data-back_url="<?php echo $back_url; ?>" type="submit" class="<?php echo is_admin() ? 'tutor-btn-primary' : ''; ?> tutor-btn tutor-btn-sm tutor-ml-15">
					<?php esc_html_e( 'Reply', 'tutor' ); ?> 
				</button>
			</div>
		</div>
	</div>

	<?php
	if ( $context == 'backend-dashboard-qna-single' ) {
		// Right sidebar should be loaded at backend dashboard only
		?>
			<div class="tutor-qna-admin-sidebar">
				<div class="tutor-qna-user">
					<img src="<?php echo get_avatar_url( $question->user_id ); ?>"/>
					<h2><?php echo $question->display_name; ?></h2>
					<strong><?php echo $question->user_email; ?></strong>
					<div class="tutor-user-social tutor-bs-d-flex tutor-mt-25" style="column-gap: 21px;">
						<?php 
							$tutor_user_social_icons = tutor_utils()->tutor_user_social_icons();

							foreach ( $tutor_user_social_icons as $key => $social_icon ) :
								$url                                    = get_user_meta( $question->user_id, $key, true );
								$tutor_user_social_icons[ $key ]['url'] = $url;
								if ( '' === $url ) {
									continue;
								}
						?>
							<a href="<?php echo esc_url( $url ); ?>">
								<i class="color-text-hints <?php echo esc_attr( $social_icon['icon_classes'] ); ?>"></i>
							</a>
						<?php endforeach;?>
					</div>
				</div>
				<table class="tutor-ui-table tutor-ui-table-responsive tutor-ui-table-data-td-target">
					<tr>
						<td class="expand-btn" data-th="Collapse" data-td-target="tutor-asked-under-course" style="background-color: #F4F6F9;">
							<div class="tutor-bs-d-flex justify-content-between align-items-center">
								<span class="color-text-primary text-medium-body tutor-pl-10">
									<?php esc_html_e( 'Asked Under', 'tutor' ); ?>
								</span>
								<div class="tutor-icon-angle-down-filled tutor-color-brand-wordpress has-data-td-target"></div>
							</div>
							
						</td>
					</tr>
					<tr>
						<td class="data-td-content" id="tutor-asked-under-course">
							<div class="td-toggle-content">
								<span class="color-text-primary text-bold-body">
									<?php echo esc_html( $question->post_title ); ?>
								</span>
							</div>
						</td>
					</tr>
				</table>

				<table class="tutor-ui-table tutor-ui-table-responsive tutor-ui-table-data-td-target">
					<tr>
						<td class="expand-btn" data-th="Collapse" data-td-target="tutor-prev-question-history" style="background-color: #F4F6F9;">
							<div class="tutor-bs-d-flex justify-content-between align-items-center">
								<span class="color-text-primary text-medium-body tutor-pl-10">
									<?php esc_html_e( 'Previous Question History', 'tutor' ); ?>
								</span>
								<div class="tutor-icon-angle-down-filled tutor-color-brand-wordpress has-data-td-target"></div>
							</div>
							
						</td>
					</tr>
					<tr>
						<td class="data-td-content" id="tutor-prev-question-history">
							<div class="td-toggle-content">
								<?php
									$own_questions = tutor_utils()->get_qa_questions( 0, 10, '', null, null, $question->user_id );
								?>
								<?php if ( count( $own_questions ) ) : ?>
									<div class="qna-previous-questions">
										<?php foreach ( $own_questions as $question ) : ?>
											<div>
												<span class="color-text-subsued text-regular-caption">
													<?php echo esc_html( date_i18n( get_option( 'date_format') , strtotime( $question->comment_date ) ) ); ?>,
													<?php echo esc_html( date_i18n( get_option( 'time_format') , strtotime( $question->comment_date ) ) ); ?>
												</span>
												<span class="color-text-primary text-bold-body">
													<?php echo esc_textarea( $question->comment_content ); ?>
												</span>
												<span class="color-text-subsued">
													<?php esc_html_e( 'Course', 'tutor' ); ?></strong>: <?php echo esc_html( $question->post_title ); ?>
												</span>
											</div>
										<?php endforeach; ?>
									</div>
								<?php else : ?>
									<?php tutor_utils()->tutor_empty_state( tutor_utils()->not_found_text() ); ?>
								<?php endif; ?>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<?php
	}
	?>
</div>
