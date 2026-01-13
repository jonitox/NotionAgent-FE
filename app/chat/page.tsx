'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatBox from '@/components/ChatBox'
import SettingsModal from '@/components/SettingsModal'
import { api } from '@/lib/api'
import type { AuthResponse, UserSettingsResponse } from '@/lib/types'

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
		const fetchSettings = async () => {
			try {
				const data = await api.get<UserSettingsResponse>('/api/v1/settings/')
				if (data) {
					setSettings({
						openaiApiKey: data.openai_api_key || '',
						notionApiKey: data.notion_api_key || '',
						notionPageId: data.notion_page_id || '',
					})
				}
			} catch (err) {
				console.error('Failed to fetch settings', err)
			}
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

		fetchSettings()
		fetchMe()
	}, [router])

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleSaveSettings = async (next: Settings) => {
		try {
			await api.post<UserSettingsResponse>('/api/v1/settings/', {
				openai_api_key: next.openaiApiKey,
				notion_api_key: next.notionApiKey,
				notion_page_id: next.notionPageId,
			})
			setSettings(next)
			setShowModal(false)
		} catch (err) {
			console.error('Failed to save settings', err)
			alert('설정 저장에 실패했습니다.')
		}
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