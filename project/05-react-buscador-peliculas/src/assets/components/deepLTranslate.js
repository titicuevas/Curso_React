const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate'

export const translateText = async (text, targetLanguage) => {
  const apiKey = import.meta.env.VITE_DEEPL_API_KEY

  if (!apiKey) {
    console.warn('VITE_DEEPL_API_KEY no está configurada')
    return text
  }

  if (!text?.trim()) {
    return text
  }

  const url = `${DEEPL_API_URL}?auth_key=${apiKey}&text=${encodeURIComponent(text)}&target_lang=${targetLanguage}`

  try {
    const response = await fetch(url, {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error(`Failed to translate text: ${response.statusText}`)
    }

    const data = await response.json()

    if (data?.translations?.length > 0) {
      return data.translations[0].text
    }

    throw new Error('No translation available')
  } catch (error) {
    console.error('Error translating text:', error)
    return text
  }
}
