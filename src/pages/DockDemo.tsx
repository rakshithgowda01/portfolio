import React, { useState } from 'react';
import MacOSDock from '@/components/ui/mac-os-dock';

// Sample app data with actual macOS-style icons
const sampleApps = [
	{ 
		id: 'finder', 
		name: 'Finder', 
		icon: 'https://images.unsplash.com/photo-1542759564-7ccbb6dc0d7b?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'calculator', 
		name: 'Calculator', 
		icon: 'https://images.unsplash.com/photo-1520235076181-45e219bcd5f0?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'terminal', 
		name: 'Terminal', 
		icon: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'mail', 
		name: 'Mail', 
		icon: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'notes', 
		name: 'Notes', 
		icon: 'https://images.unsplash.com/photo-1517976487492-576ea0b2fe81?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'safari', 
		name: 'Safari', 
		icon: 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'photos', 
		name: 'Photos', 
		icon: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'music', 
		name: 'Music', 
		icon: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=256&auto=format&fit=crop' 
	},
	{ 
		id: 'calendar', 
		name: 'Calendar', 
		icon: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=256&auto=format&fit=crop' 
	},
];

const DockDemo: React.FC = () => {
	const [openApps, setOpenApps] = useState<string[]>(['finder', 'safari']);

	const handleAppClick = (appId: string) => {
		console.log('App clicked:', appId);
		
		// Toggle app in openApps array
		setOpenApps(prev => 
			prev.includes(appId) 
				? prev.filter(id => id !== appId)
				: [...prev, appId]
		);
	};

	return (
		<div style={{ 
			height: '100vh', 
			width: '100vw',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden'
		}}>
			{/* The Dock Component */}
			<MacOSDock
				apps={sampleApps}
				onAppClick={handleAppClick}
				openApps={openApps}
			/>
		</div>
	);
};

export default DockDemo;



