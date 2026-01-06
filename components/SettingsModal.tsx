import { useEffect, useState } from 'react'

type Settings = {
	openaiApiKey: string
	notionApiKey: string
	notionPageId: string
}

interface SettingsModalProps {
	initialSettings: Settings
	onClose: () => void
	onSave: (next: Settings) => void
}

export default function SettingsModal({
	initialSettings,
	onClose,
	onSave,
}: SettingsModalProps) {
	const [draft, setDraft] = useState<Settings>(initialSettings)
	const [showKeys, setShowKeys] = useState({
		openaiApiKey: false,
		notionApiKey: false,
		notionPageId: false,
	})

	useEffect(() => {
		setDraft(initialSettings)
	}, [initialSettings])

	const toggleKeyVisibility = (key: keyof Settings) => {
		setShowKeys((prev) => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]" onClick={onClose}>
			<div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
				<h2 className="text-xl font-bold mb-5 text-gray-900">Settings</h2>

				<SettingInput
					label="OpenAI API Key"
					type="password"
					value={draft.openaiApiKey}
					onChange={(value) => setDraft((prev) => ({ ...prev, openaiApiKey: value }))}
					placeholder="sk-..."
					isVisible={showKeys.openaiApiKey}
					onToggleVisibility={() => toggleKeyVisibility('openaiApiKey')}
				/>

				<SettingInput
					label="Notion API Key"
					type="password"
					value={draft.notionApiKey}
					onChange={(value) => setDraft((prev) => ({ ...prev, notionApiKey: value }))}
					placeholder="ntn_..."
					isVisible={showKeys.notionApiKey}
					onToggleVisibility={() => toggleKeyVisibility('notionApiKey')}
				/>

				<SettingInput
					label="Notion Page ID"
					type="text"
					value={draft.notionPageId}
					onChange={(value) => setDraft((prev) => ({ ...prev, notionPageId: value }))}
					placeholder="Page ID"
					isVisible={showKeys.notionPageId}
					onToggleVisibility={() => toggleKeyVisibility('notionPageId')}
				/>

				<div className="flex gap-2 justify-end mt-6">
					<button
						onClick={() => {
							onSave(draft)
							onClose()
						}}
						className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
					>
						Save
					</button>
					<button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

interface SettingInputProps {
	label: string
	type: string
	value: string
	onChange: (value: string) => void
	placeholder: string
	isVisible: boolean
	onToggleVisibility: () => void
}

function SettingInput({
	label,
	type,
	value,
	onChange,
	placeholder,
	isVisible,
	onToggleVisibility,
}: SettingInputProps) {
	const isPassword = type === 'password'

	return (
		<div className="mb-4 flex flex-col gap-1.5">
			<label className="text-sm font-semibold text-gray-700">{label}</label>
			<div className="flex items-center gap-2">
				<input
					type={isPassword && !isVisible ? 'password' : 'text'}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
				{isPassword && (
					<button
						type="button"
						onClick={onToggleVisibility}
						className="px-2.5 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
						title={isVisible ? 'Hide' : 'Show'}
					>
						{isVisible ? <EyeSlashIcon /> : <EyeIcon />}
					</button>
				)}
			</div>
		</div>
	)
}

function EyeIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			className="h-5 w-5"
		>
			<path d="M1.5 12s3.5-6.5 10.5-6.5S22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z" />
			<circle cx="12" cy="12" r="3.5" />
		</svg>
	)
}

function EyeSlashIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			className="h-5 w-5"
		>
			<path d="M3 3l18 18" />
			<path d="M4.5 5.4C2.7 7 1.5 9 1.5 9c0 .1 3.5 6.5 10.5 6.5 2 0 3.7-.4 5.2-1.1M15.3 15.3a3.5 3.5 0 01-4.6-4.6" />
			<path d="M9.2 5.6A8.5 8.5 0 0112 5.5C19 5.5 22.5 12 22.5 12c0 .1-.9 1.7-2.7 3.2" />
		</svg>
	)
}
