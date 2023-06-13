const STRAPI_ENDPOINT = process.env.STRAPI_ENDPOINT
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export async function getProductIds(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-products?fields[0]=pid`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getProductIds API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            return data.attributes
        })
}

export async function getProductsForPreview(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-products?populate=*`
     + '&fields[0]=pid'
     + '&fields[1]=category'
     + '&fields[2]=name'
     + '&fields[3]=coverImage'
     + '&fields[4]=price'
     + '&fields[5]=inStock'
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getProductsForPreview API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            data.attributes.coverImage = data.attributes.coverImage.data.attributes.url
            return data.attributes
        })
        .sort((product1, product2) => (product1.category < product2.category ? -1 : 1))
}

export async function getProduct(pid : string): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-products?filters[pid][$eq]=${pid}&populate=*`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getProduct API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let product = body.data[0].attributes
    product.coverImage = product.coverImage.data.attributes.url
    
    return product
}

export async function getPosts(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-posts?populate=*`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getPosts API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            data.attributes.coverImage = data.attributes.coverImage.data.attributes.url
            return data.attributes
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getPostSlugs(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-posts?fields[0]=slug`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getPostSlugs API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            return data.attributes
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getPost(slug : string): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-posts?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getPost API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let post = body.data[0].attributes
    post.coverImage = post.coverImage.data.attributes.url
    
    return post
}

export async function getAboutContent(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-about`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getAboutContent API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes.content
}

export async function getServicesContent(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-service`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getServicesContent API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes.content
}

export async function getHomeIntroContent(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-home-intro`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getHomeIntroContent API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes.content
}

export async function getAboutTeacherContent(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-about-teacher`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getAboutTeacherContent API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes.content
}

export async function getAboutAcademyContent(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-about-academy`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getAboutAcademyContent API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes.content
}

export async function getFooter(): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-footer`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getFooter API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    return body.data.attributes
}

