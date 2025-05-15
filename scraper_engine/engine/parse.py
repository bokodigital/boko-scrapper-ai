def clean_body_content(body_content):
    for script_or_style in body_content(["script", "style"]):
        script_or_style.extract()

    # Get text or further process the content
    cleaned_content = body_content.get_text(separator="\n")
    cleaned_content = "\n".join(
        line.strip() for line in cleaned_content.splitlines() if line.strip()
    )

    return cleaned_content
    
    
# Function to split the DOM content
def split_dom_content(dom_content, max_length=6000):
    return [
        dom_content[i : i + max_length] for i in range(0, len(dom_content), max_length)
    ]