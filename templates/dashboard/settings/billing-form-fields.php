<?php
/**
 * Billing form fields child template
 *
 * @package Tutor\Templates
 * @subpackage Dashboard\Settings
 * @author Themeum <support@themeum.com>
 * @link https://themeum.com
 * @since 3.0.0
 */

use Tutor\Ecommerce\BillingController;

$billing_controller = new BillingController();
$billing_info       = $billing_controller->get_billing_info();

$billing_first_name = $billing_info->billing_first_name ?? '';
$billing_last_name  = $billing_info->billing_last_name ?? '';
$billing_email      = $billing_info->billing_email ?? '';
$billing_phone      = $billing_info->billing_phone ?? '';
$billing_zip_code   = $billing_info->billing_zip_code ?? '';
$billing_address    = $billing_info->billing_address ?? '';
$billing_country    = $billing_info->billing_country ?? '';
$billing_state      = $billing_info->billing_state ?? '';
$billing_city       = $billing_info->billing_city ?? '';

?>

<div class="tutor-row">
	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'First Name', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_first_name" value="<?php echo esc_attr( $billing_first_name ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Last Name', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_last_name" value="<?php echo esc_attr( $billing_last_name ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Email Address', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="email" name="billing_email" value="<?php echo esc_attr( $billing_email ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Country', 'tutor' ); ?>
			</label>
			<select name="billing_country" class="tutor-form-control" tutor-billing-country required>
				<option value=""><?php esc_html_e( 'Select Country', 'tutor' ); ?></option>
				<?php
				$countries = tutor_get_country_list();
				foreach ( $countries as $country ) :
					?>
					<option value="<?php echo esc_attr( $country['numeric_code'] ); ?>" <?php selected( $billing_country, $country['numeric_code'] ); ?>>
						<?php echo esc_html( $country['name'] ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</div>
	</div>

	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'State', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_state" value="<?php echo esc_attr( $billing_state ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'City', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_city" value="<?php echo esc_attr( $billing_city ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Postcode / ZIP', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_zip_code" value="<?php echo esc_attr( $billing_zip_code ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12 tutor-col-sm-6 tutor-col-md-12 tutor-col-lg-6">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Phone', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_phone" value="<?php echo esc_attr( $billing_phone ); ?>" required>
		</div>
	</div>

	<div class="tutor-col-12">
		<div class="tutor-mb-16">
			<label class="tutor-form-label tutor-color-secondary">
				<?php esc_html_e( 'Address', 'tutor' ); ?>
			</label>
			<input class="tutor-form-control" type="text" name="billing_address" value="<?php echo esc_attr( $billing_address ); ?>" required>
		</div>
	</div>
</div>

<script>
	window.addEventListener('DOMContentLoaded', () => {
		const country = document.querySelector('[name="billing_country"]');
		const checkoutDetails = document.querySelector('[tutor-checkout-details]');
		const applyBtn = document.querySelector('[tutor-apply-coupon]');
		const couponInput = document.querySelector('[name="coupon_code"]');

		// country.addEventListener('input', async (event) => {
		// 	const couponCode = couponInput.value ?? null;
		// 	let endpoint = `${window._tutorobject.ajaxurl}?action=tutor_update_checkout_data&country_code=${event.target.value}`;

		// 	if (couponCode) {
		// 		endpoint += `&coupon_code=${couponCode}`;
		// 	}

		// 	const response = await fetch(endpoint);
		// 	const data = await response.json();

		// 	checkoutDetails.innerHTML = data.data.html;
		// });

		// applyBtn.addEventListener('click', async (event) => {
		// 	const countryCode = country.value ?? null;
		// 	const couponCode = couponInput.value ?? null;
		// 	let endpoint = `${window._tutorobject.ajaxurl}?action=tutor_update_checkout_tax&coupon_code=${couponCode}`;

		// 	if (country) {
		// 		endpoint += `&country_code=${countryCode}`;
		// 	}

		// 	const response = await fetch(endpoint);
		// 	const data = await response.json();

		// 	checkoutDetails.innerHTML = data.data.html;
		// })
	});
</script>
