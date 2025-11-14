<?php

namespace App\Services;

class SeoScoreCalculator
{
    private $focusKeyword;
    private $title;
    private $subtitle;
    private $slug;
    private $content;
    private $metaTitle;
    private $metaDescription;
    private $metaTags;
    private $results = [];
    private $totalScore = 0;

    public function __construct($data)
    {
        $this->focusKeyword = strtolower(trim($data['focus_keyword'] ?? ''));
        $this->title = $data['title'] ?? '';
        $this->subtitle = $data['subtitle'] ?? '';
        $this->slug = $data['slug'] ?? '';
        $this->content = $data['content'] ?? '';
        $this->metaTitle = $data['meta_title'] ?? '';
        $this->metaDescription = $data['meta_description'] ?? '';
        $this->metaTags = is_array($data['tags'] ?? null) ? $data['tags'] : explode(',', $data['tags'] ?? '');
    }

    public function calculate()
    {
        if (empty($this->focusKeyword)) {
            return [
                'score' => 0,
                'results' => [[
                    'element' => 'Focus Keyword',
                    'weight' => 0,
                    'passed' => false,
                    'message' => 'Focus keyword belum diisi. Silakan tambahkan focus keyword untuk analisis SEO.'
                ]],
            ];
        }

        $this->checkKeywordInMetaTitle();
        $this->checkKeywordInFirstParagraph();
        $this->checkKeywordInMetaTags();
        $this->checkKeywordInMetaDescription();
        $this->checkTitleLength();
        $this->checkKeywordInFirst70CharsOfTitle();
        $this->checkKeywordDensity();
        $this->checkKeywordInH2();
        $this->checkKeywordInSlug();
        $this->checkMetaDescriptionLength();
        $this->checkInternalLinks();
        $this->checkOutboundLinksWithKeyword();

        return [
            'score' => $this->totalScore,
            'results' => $this->results,
        ];
    }

    private function addResult($element, $weight, $passed, $message)
    {
        $this->results[] = [
            'element' => $element,
            'weight' => $weight,
            'passed' => $passed,
            'message' => $message,
        ];

        if ($passed) {
            $this->totalScore += $weight;
        }
    }

    // 1. Keyword in meta title (18 points)
    private function checkKeywordInMetaTitle()
    {
        $title = !empty($this->metaTitle) ? $this->metaTitle : $this->title;
        $passed = stripos(strtolower($title), $this->focusKeyword) !== false;

        $this->addResult(
            'Keyword in meta <title>',
            18,
            $passed,
            $passed ? 'Good job!' : 'Tambahkan keyword pada judul'
        );
    }

    // 2. Keyword in first paragraph (15 points)
    private function checkKeywordInFirstParagraph()
    {
        $plainText = strip_tags($this->content);
        $paragraphs = preg_split('/\n\s*\n/', trim($plainText));
        $firstParagraph = isset($paragraphs[0]) ? strtolower($paragraphs[0]) : '';

        $passed = stripos($firstParagraph, $this->focusKeyword) !== false;

        $this->addResult(
            'Keyword in first paragraph',
            15,
            $passed,
            $passed ? 'Well done!' : 'Tambahkan keyword pada paragraf pertama'
        );
    }

    // 3. Keyword in meta tags (5 points)
    private function checkKeywordInMetaTags()
    {
        $passed = false;
        foreach ($this->metaTags as $tag) {
            if (stripos(strtolower(trim($tag)), $this->focusKeyword) !== false) {
                $passed = true;
                break;
            }
        }

        $this->addResult(
            'Keyword in meta tags',
            5,
            $passed,
            $passed ? 'Well done!' : 'Tambahkan keyword pada tag'
        );
    }

    // 4. Keyword in meta description (15 points)
    private function checkKeywordInMetaDescription()
    {
        $passed = stripos(strtolower($this->metaDescription), $this->focusKeyword) !== false;

        $this->addResult(
            'Keyword in meta description',
            15,
            $passed,
            $passed ? 'Well done!' : 'Tambahkan keyword pada meta description'
        );
    }

    // 5. Title length (7 points)
    private function checkTitleLength()
    {
        $titleLength = mb_strlen($this->title);
        $passed = $titleLength <= 60;

        $this->addResult(
            'Title Length',
            7,
            $passed,
            $passed ? 'Well done!' : 'Gunakan judul yang lebih singkat dan tetap jelas'
        );
    }

    // 6. Keyword in first 70 characters of title (3 points)
    private function checkKeywordInFirst70CharsOfTitle()
    {
        $first70 = mb_substr($this->title, 0, 70);
        $passed = stripos(strtolower($first70), $this->focusKeyword) !== false;

        $this->addResult(
            'Keyword in the first 70 characters in the title',
            3,
            $passed,
            $passed ? 'Well done!' : 'Letakkan keyword pada 70 karakter pertama pada judul'
        );
    }

    // 7. Keyword density (5 points)
    private function checkKeywordDensity()
    {
        $plainText = strip_tags($this->content);
        $words = str_word_count(strtolower($plainText), 1);
        $totalWords = count($words);

        if ($totalWords == 0) {
            $this->addResult(
                'Keyword density',
                5,
                false,
                'Konten masih kosong, tambahkan konten artikel'
            );
            return;
        }

        // Count keyword occurrences
        $keywordCount = substr_count(strtolower($plainText), $this->focusKeyword);
        $density = ($keywordCount / $totalWords) * 100;

        $passed = $density >= 1 && $density <= 3;

        if ($passed) {
            $message = sprintf('Focus keyword muncul %d kali. Score %.1f%%. Thats great!', $keywordCount, $density);
        } elseif ($density < 1) {
            $message = 'Jumlah keyword belum memenuhi standar <1%, tambahkan target keyword';
        } else {
            $message = 'Jumlah keyword terlalu banyak >3%, kurangi keyword';
        }

        $this->addResult(
            'Keyword density',
            5,
            $passed,
            $message
        );
    }

    // 8. Keyword in H2 heading (10 points)
    private function checkKeywordInH2()
    {
        preg_match_all('/<h2[^>]*>(.*?)<\/h2>/is', $this->content, $matches);
        $h2Count = 0;

        foreach ($matches[1] as $h2Content) {
            $plainH2 = strip_tags($h2Content);
            if (stripos(strtolower($plainH2), $this->focusKeyword) !== false) {
                $h2Count++;
            }
        }

        $passed = $h2Count >= 1;

        $this->addResult(
            'Keyword in tag heading (H2)',
            10,
            $passed,
            $passed ? sprintf('Focus keyword muncul %d kali di tag heading. Is good!', $h2Count) : 'Tambahkan keyword pada tag heading H2!'
        );
    }

    // 9. Keyword in slug (10 points)
    private function checkKeywordInSlug()
    {
        $passed = stripos(strtolower($this->slug), $this->focusKeyword) !== false;

        $this->addResult(
            'Keyword in slug',
            10,
            $passed,
            $passed ? 'Well done!' : 'Tambahkan keyword pada URL slug'
        );
    }

    // 10. Meta description length (5 points)
    private function checkMetaDescriptionLength()
    {
        $length = mb_strlen($this->metaDescription);
        $passed = $length >= 110 && $length <= 155;

        if ($passed) {
            $message = sprintf('Jumlah karakter %d. Well done!', $length);
        } elseif ($length < 110) {
            $message = 'Jumlah karakter pada meta description terlalu sedikit, tambahkan!';
        } else {
            $message = 'Jumlah karakter pada meta description terlalu banyak, kurangi!';
        }

        $this->addResult(
            'Meta description length',
            5,
            $passed,
            $message
        );
    }

    // 11. Number of internal links (5 points)
    private function checkInternalLinks()
    {
        // Get all links
        preg_match_all('/<a[^>]+href=([\'"])(.*?)\1[^>]*>/i', $this->content, $matches);
        $internalLinkCount = 0;

        foreach ($matches[2] as $href) {
            // Check if link is internal (relative URL or same domain)
            if (!preg_match('/^https?:\/\//', $href) || stripos($href, request()->getHost()) !== false) {
                $internalLinkCount++;
            }
        }

        $passed = $internalLinkCount >= 1;

        $this->addResult(
            'Number of internal links',
            5,
            $passed,
            $passed ? sprintf('%d, Well done!', $internalLinkCount) : 'Tambahkan internal link ke artikel lain'
        );
    }

    // 12. Outbound links with targeting keyword (2 points)
    private function checkOutboundLinksWithKeyword()
    {
        preg_match_all('/<a[^>]+href=([\'"])(https?:\/\/[^\'"]+)\1[^>]*>(.*?)<\/a>/i', $this->content, $matches);
        $badOutboundCount = 0;

        for ($i = 0; $i < count($matches[0]); $i++) {
            $href = $matches[2][$i];
            $anchorText = strip_tags($matches[3][$i]);

            // Check if it's an outbound link (external domain)
            if (!stripos($href, request()->getHost())) {
                // Check if anchor text contains focus keyword
                if (stripos(strtolower($anchorText), $this->focusKeyword) !== false) {
                    $badOutboundCount++;
                }
            }
        }

        $passed = $badOutboundCount == 0;

        $this->addResult(
            'Outbound links with targeting Keyword',
            2,
            $passed,
            $passed ? '0, Good job!' : 'Tidak bagus. Ubah anchor text outbound link, jangan sama dengan target keyword.'
        );
    }
}
