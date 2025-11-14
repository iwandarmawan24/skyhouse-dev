import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function SeoAnalyzer({
    title,
    subtitle,
    slug,
    content,
    metaTitle,
    metaDescription,
    metaKeywords,
    focusKeyword,
    tags
}) {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Debounce the analysis
        const timer = setTimeout(() => {
            if (focusKeyword) {
                analyzeContent();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [title, subtitle, slug, content, metaTitle, metaDescription, metaKeywords, focusKeyword, tags]);

    const analyzeContent = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/admin/articles/analyze-seo', {
                title,
                subtitle,
                slug,
                content,
                meta_title: metaTitle,
                meta_description: metaDescription,
                meta_keywords: metaKeywords,
                focus_keyword: focusKeyword,
                tags: tags
            });
            setAnalysis(response.data);
        } catch (error) {
            console.error('SEO Analysis Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Poor';
    };

    if (!focusKeyword) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        SEO Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Masukkan <strong>Focus Keyword</strong> untuk mendapatkan analisis SEO secara real-time.
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (loading && !analysis) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>SEO Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!analysis) return null;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>SEO Analysis</CardTitle>
                    {loading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* SEO Score */}
                <div className={`rounded-lg border-2 p-6 text-center ${getScoreColor(analysis.score)}`}>
                    <div className="text-5xl font-bold mb-2">{analysis.score}/100</div>
                    <div className="text-lg font-semibold">{getScoreLabel(analysis.score)}</div>
                    <div className="text-sm mt-1">SEO Score</div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-3">
                    {analysis.results.map((result, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${
                                result.passed
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                            }`}
                        >
                            <div className="shrink-0 mt-0.5">
                                {result.passed ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                        {result.element}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                        {result.weight} pts
                                    </Badge>
                                </div>
                                <p className={`text-sm ${
                                    result.passed ? 'text-green-700' : 'text-red-700'
                                }`}>
                                    {result.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tips */}
                {analysis.score < 80 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                            💡 Tips untuk meningkatkan SEO Score:
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                            {analysis.results
                                .filter(r => !r.passed)
                                .slice(0, 3)
                                .map((result, idx) => (
                                    <li key={idx}>{result.message}</li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
