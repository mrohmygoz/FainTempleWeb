const STRAPI_ENDPOINT = process.env.STRAPI_ENDPOINT
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

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

export async function getEnlightments(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-enlightments?populate=*`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getEnlightments API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            return data.attributes
        })
        .sort((data1, data2) => (data1.date > data2.date ? -1 : 1))
}

export async function getEnlightmentSlugs(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-enlightments?fields[0]=slug`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getEnlightmentSlugs API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            return data.attributes
        })
        .sort((data1, data2) => (data1.date > data2.date ? -1 : 1))
}

export async function getEnlightment(slug : string): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-enlightments?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getEnlightment API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data[0].attributes
    
    return data
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

export async function getTeacherBlogPosts(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-teacher-blog-posts?populate=*`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getTeacherBlogPosts API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            if (data.attributes.previewImage.data !== null) {
                data.attributes.previewImage = data.attributes.previewImage.data.attributes.url
            } else {
                data.attributes.previewImage = null
            }
            return data.attributes
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getTeacherBlogPostSlugs(): Promise<any> {
    let url = `${STRAPI_ENDPOINT}/api/temple-teacher-blog-posts?fields[0]=slug`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getTeacherBlogPostSlugs API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let data = body.data
    
    return data
        .map((data) => {
            return data.attributes
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getTeacherBlogPost(slug : string): Promise<any> {
    const response = await fetch(`${STRAPI_ENDPOINT}/api/temple-teacher-blog-posts?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
      throw new Error(`getTeacherBlogPost API request failed with status ${response.status}`);
    }
  
    let body = await response.json()
    let post = body.data[0].attributes
    if (post.previewImage.data !== null) {
        post.previewImage = post.previewImage.data.attributes.url
    } else {
        post.previewImage = null
    }
    
    return post
}

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
    //  + '&fields[0]=pid'
    //  + '&fields[1]=category'
    //  + '&fields[2]=name'
    //  + '&fields[3]=coverImage'
    //  + '&fields[4]=price'
    //  + '&fields[5]=inStock'
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
    })
  
    if (!response.ok) {
        let body = await response.json()
        console.log("[ERROR] " + JSON.stringify(body))
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

