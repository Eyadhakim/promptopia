"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession  } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });


  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails();
  }, [promptId])
  


  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt ID not found")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })

      if (response.ok) {
        const data = response.json()
        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

const EditPromptSuspense = () => {
  return (
    <Suspense>
      <EditPrompt/>
    </Suspense>
  )
}

export default EditPromptSuspense;
