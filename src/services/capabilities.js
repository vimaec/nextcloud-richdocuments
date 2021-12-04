import { getCapabilities } from '@nextcloud/capabilities'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

let capabilities = getCapabilities().richdocuments ?? {}

export const getAppCapabilities = async() => {
	if (!capabilities?.config?.wopi_url || !(capabilities?.collabora?.productVersion || capabilities?.collabora?.hasProxyPrefix)) {
		const { data } = await axios.get(generateUrl('/apps/richdocuments/settings'))
		setCapabilities(data.richdocuments)
	}

	return capabilities
}

export const setCapabilities = (newCapabilities) => capabilities = newCapabilities
