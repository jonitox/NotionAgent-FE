'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatBox from '@/components/ChatBox'
import SettingsModal from '@/components/SettingsModal'
import { api } from '@/lib/api'
import type { AuthResponse } from '@/lib/types'

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
	const [user, setUser] = useState<AuthResponse | null>(null)
	const [logoutLoading, setLogoutLoading] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('notionAgentSettings') // TODO: call BE API
		if (saved) {
			const parsedSettings = JSON.parse(saved)
			setSettings(parsedSettings)
		}

		const fetchMe = async () => {
			try {
				const me = await api.get<AuthResponse>('/api/v1/auth/me')
				setUser(me)
			} catch (err) {
				console.error('Failed to fetch current user', err)
				router.replace('/login')
			}
		}

		fetchMe()
	}, [router])

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

	const handleLogout = async () => {
		setLogoutLoading(true)
		try {
			await api.post('/api/v1/auth/logout', {})
		} catch (err) {
			console.error('Logout failed', err)
		} finally {
			localStorage.removeItem('notionAgentSettings')
			router.replace('/login')
			setLogoutLoading(false)
		}
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-6">
			<LogoutButton onLogout={handleLogout} username={user?.username} loading={logoutLoading} />

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


function LogoutButton({
	onLogout,
	username,
	loading = false,
}: {
	onLogout: () => void
	username?: string
	loading?: boolean
}) {
	return (
		<div className="fixed top-6 right-6 flex items-center gap-2 text-sm font-semibold text-gray-700">
			{username && <span className="no-underline select-none">{username}</span>}
			<button
				onClick={onLogout}
				disabled={loading}
				className="underline hover:text-gray-900 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
				title="Logout"
			>
				LOG OUT
			</button>
		</div>
	)
}