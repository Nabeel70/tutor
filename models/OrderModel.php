<?php
/**
 * Order Model
 *
 * @package Tutor\Models
 * @author Themeum <support@themeum.com>
 * @link https://themeum.com
 * @since 2.0.6
 */

namespace Tutor\Models;

use Tutor\Helpers\QueryHelper;
use TUTOR\Input;

/**
 * OrderModel Class
 *
 * @since 2.0.6
 */
class OrderModel {

	/**
	 * Order table name
	 *
	 * @since 3.0.0
	 *
	 * @var string
	 */
	private $table_name = 'tutor_orders';

	/**
	 * Order status
	 *
	 * @since 3.0.0
	 *
	 * @var string
	 */
	const ORDER_PENDING            = 'pending';
	const ORDER_COMPLETED          = 'completed';
	const ORDER_CANCELLED          = 'cancelled';
	const ORDER_REFUNDED           = 'refunded';
	const ORDER_PARTIALLY_REFUNDED = 'partially-refunded';

	/**
	 * Payment status
	 *
	 * @since 3.0.0
	 *
	 * @var string
	 */
	const PAYMENT_STATUS_PENDING = 'pending';
	const PAYMENT_STATUS_PAID    = 'paid';
	const PAYMENT_STATUS_FAILED  = 'failed';

	/**
	 * Resolve props & dependencies
	 *
	 * @since 3.0.0
	 */
	public function __construct() {
		global $wpdb;
		$this->table_name = $wpdb->prefix . $this->table_name;
	}

	/**
	 * Get table name with wp prefix
	 *
	 * @since 3.0.0
	 *
	 * @return string
	 */
	public function get_table_name() {
		return $this->table_name;
	}


	/**
	 * Get all order statuses
	 *
	 * @since 3.0.0
	 *
	 * @return array
	 */
	public static function get_order_status() {
		return array(
			self::ORDER_PENDING            => __( 'Pending', 'tutor' ),
			self::ORDER_COMPLETED          => __( 'Completed', 'tutor' ),
			self::ORDER_CANCELLED          => __( 'Cancelled', 'tutor' ),
			self::ORDER_REFUNDED           => __( 'Refunded', 'tutor' ),
			self::ORDER_PARTIALLY_REFUNDED => __( 'Partially Refunded', 'tutor' ),
		);
	}

	/**
	 * Get all payment statuses
	 *
	 * @since 3.0.0
	 *
	 * @return array
	 */
	public static function get_payment_status() {
		return array(
			self::PAYMENT_STATUS_PENDING => __( 'Pending', 'tutor' ),
			self::PAYMENT_STATUS_PAID    => __( 'Paid', 'tutor' ),
			self::PAYMENT_STATUS_FAILED  => __( 'Failed', 'tutor' ),
		);
	}

	/**
	 * Get orders list
	 *
	 * @since 3.0.0
	 *
	 * @param array  $where where clause conditions.
	 * @param array  $search search clause conditions.
	 * @param int    $limit limit default 10.
	 * @param int    $offset default 0.
	 * @param string $order_by column default 'o.id'.
	 * @param string $order list order default 'desc'.
	 *
	 * @return array
	 */
	public function get_orders( array $where = array(), $search = array(), int $limit = 10, int $offset = 0, string $order_by = 'o.id', string $order = 'desc' ) {

		global $wpdb;

		$primary_table  = "{$wpdb->prefix}tutor_orders o";
		$joining_tables = array(
			array(
				'type'  => 'INNER',
				'table' => "{$wpdb->users} u",
				'on'    => 'o.user_id = u.ID',
			),
			array(
				'type'  => 'LEFT',
				'table' => "{$wpdb->usermeta} um1",
				'on'    => 'u.ID = um1.user_id AND um1.meta_key = "tutor_customer_billing_name"',
			),
			array(
				'type'  => 'LEFT',
				'table' => "{$wpdb->usermeta} um2",
				'on'    => 'u.ID = um2.user_id AND um2.meta_key = "tutor_customer_billing_name"',
			),
		);

		$select_columns = array( 'o.*', 'u.user_login', 'um1.meta_value as billing_name', 'um2.meta_value as billing_email' );

		return QueryHelper::get_joined_data( $primary_table, $joining_tables, $select_columns, $where, $search, $order_by, $limit, $offset, $order );
	}

	/**
	 * Get order count
	 *
	 * @since 3.0.0
	 *
	 * @param array $where Where conditions.
	 * @param array $search Search conditions.
	 *
	 * @return int
	 */
	public function get_order_count( $where = array(), $search = array() ) {
		$where  = Input::sanitize_array( $where );
		$search = Input::sanitize_array( $search );

		return QueryHelper::get_count( $this->table_name, $where, $search );
	}
}
