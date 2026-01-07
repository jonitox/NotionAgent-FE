'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatBox from '@/components/ChatBox'
import SettingsModal from '@/components/SettingsModal'

type Settings = {
	openaiApiKey: string
	notionApiKey: string
	notionPageId: string
}

export default function ChatPage() {
	const router = useRouter()
	const [showModal, setShowModal] = useState(false)
	const [settings, setSettings] = useState<Settings>({
		openaiApiKey: '',
		notionApiKey: '',
		notionPageId: '',
	})

	useEffect(() => {
		const saved = localStorage.getItem('notionAgentSettings') // TODO: call BE API
		if (saved) {
			const parsedSettings = JSON.parse(saved)
			setSettings(parsedSettings)
		}
	}, [])

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleSaveSettings = (next: Settings) => {
		setSettings(next)
		localStorage.setItem('notionAgentSettings', JSON.stringify(next)) // TODO: call BE API
		setShowModal(false)
	}

	const handleLogout = () => {
		localStorage.removeItem('notionAgentSettings')
		router.replace('/login')
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-6">
			<LogoutButton onLogout={handleLogout} />

			<ChatBox onOpenSettings={handleOpenModal} />

			{showModal && (
				<SettingsModal
					initialSettings={settings}
					onClose={handleCloseModal}
					onSave={handleSaveSettings}
				/>
			)}
		</main>
	)
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
	return (
		<button
			onClick={onLogout}
			className="fixed top-6 right-6 text-sm font-semibold text-gray-700 underline hover:text-gray-900 focus:outline-none"
			title="Logout"
		>
			LOG OUT
		</button>
	)
}