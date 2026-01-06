import type { CSSProperties } from 'react'

type Settings = {
	openaiApiKey: string
	notionApiKey: string
	notionPageId: string
}

interface SettingsModalProps {
	isOpen: boolean
	settings: Settings
	onClose: () => void
	onSave: () => void
	onChange: (key: keyof Settings, value: string) => void
}

export default function SettingsModal({
	isOpen,
	settings,
	onClose,
	onSave,
	onChange,
}: SettingsModalProps) {
	if (!isOpen) return null

	return (
		<div style={styles.modalOverlay} onClick={onClose}>
			<div style={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 style={styles.modalTitle}>Settings</h2>

				<div style={styles.settingGroup}>
					<label style={styles.label}>OpenAI API Key</label>
					<input
						type="password"
						value={settings.openaiApiKey}
						onChange={(e) => onChange('openaiApiKey', e.target.value)}
						style={styles.settingInput}
						placeholder="sk-..."
					/>
				</div>

				<div style={styles.settingGroup}>
					<label style={styles.label}>Notion API Key</label>
					<input
						type="password"
						value={settings.notionApiKey}
						onChange={(e) => onChange('notionApiKey', e.target.value)}
						style={styles.settingInput}
						placeholder="ntn_..."
					/>
				</div>

				<div style={styles.settingGroup}>
					<label style={styles.label}>Notion Page ID</label>
					<input
						type="text"
						value={settings.notionPageId}
						onChange={(e) => onChange('notionPageId', e.target.value)}
						style={styles.settingInput}
						placeholder="Page ID"
					/>
				</div>

				<div style={styles.modalButtonGroup}>
					<button onClick={onSave} style={styles.saveButton}>
						Save
					</button>
					<button onClick={onClose} style={styles.cancelButton}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	modalOverlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	modal: {
		background: '#ffffff',
		borderRadius: '12px',
		padding: '24px',
		width: 'min(400px, 90%)',
		boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
		border: '1px solid #e5e7eb',
	},
	modalTitle: {
		fontSize: '20px',
		fontWeight: 700,
		marginBottom: '20px',
		color: '#111827',
	},
	settingGroup: {
		marginBottom: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
	},
	label: {
		fontSize: '14px',
		fontWeight: 600,
		color: '#374151',
	},
	settingInput: {
		padding: '10px 12px',
		borderRadius: '8px',
		border: '1px solid #d1d5db',
		fontSize: '14px',
		outline: 'none',
		transition: 'border 0.2s ease',
	},
	modalButtonGroup: {
		display: 'flex',
		gap: '8px',
		justifyContent: 'flex-end',
		marginTop: '24px',
	},
	saveButton: {
		padding: '10px 16px',
		borderRadius: '8px',
		border: 'none',
		background: '#2563eb',
		color: '#ffffff',
		fontWeight: 600,
		cursor: 'pointer',
		transition: 'background 0.2s ease',
	},
	cancelButton: {
		padding: '10px 16px',
		borderRadius: '8px',
		border: '1px solid #d1d5db',
		background: '#ffffff',
		color: '#374151',
		fontWeight: 600,
		cursor: 'pointer',
		transition: 'background 0.2s ease',
	},
}
