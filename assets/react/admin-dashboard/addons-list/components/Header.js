import React from 'react';
import { useAddons, useAddonsUpdate } from '../context/AddonsContext';

const { __ } = wp.i18n;

const Header = () => {
	const filterBtns = ['all', 'active', 'deactive', 'required'];
	const { addonList } = useAddons();
	const { activeTab, getTabStatus } = useAddonsUpdate();
	const activeCount = addonList?.reduce((sum, addon) => sum + Number(addon.is_enabled), 0);
	const deactiveCount = addonList?.reduce((sum, addon) => sum + Number(!addon.is_enabled), 0);
	const requiredCount = addonList?.reduce((sum, addon) => sum + Number(addon.hasOwnProperty('depend_plugins') || 0), 0);

	return (
		<header className="tutor-addons-list-header tutor-bs-d-lg-flex justify-content-between align-items-center tutor-px-30 tutor-py-15">
			<div className="title text-medium-h5 color-text-primary tutor-bs-mb-lg-0 tutor-bs-mb-3">{__('Addons List', 'tutor')}</div>
			<div className="filter-btns text-regular-body color-text-subsued ">
				{filterBtns.map((btn, index) => {
					return (
						<button
							type="button"
							className={`filter-btn ${btn === activeTab ? 'is-active' : ''}`}
							key={index}
							onClick={() => getTabStatus(btn)}
						>
							{btn}{' '}
							<span className="item-count">
								(
								{'active' === btn
									? activeCount
									: 'deactive' === btn
									? deactiveCount
									: 'required' === btn
									? requiredCount
									: addonList?.length}
								)
							</span>
						</button>
					);
				})}
			</div>
		</header>
	);
};

export default Header;
